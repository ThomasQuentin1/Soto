/// @ts-nocheck
// @ts-ignore
const fs = require("fs");
// @ts-ignore
const fetch = require("isomorphic-unfetch");
const sqlite = require("sqlite3").verbose();
const mysql = require("mysql");
import { IsBio } from "../server/algo/scoring/Bio";
import EnvScoring from "../server/algo/scoring/EnvScoring";
import HealthScoring from "../server/algo/scoring/HealthScoring";
import { IsNoGluten } from "../server/algo/scoring/NoGluten";
import { IsPeanutFree } from "../server/algo/scoring/Peanut";
import PriceScoring from "../server/algo/scoring/PriceScoring";
import ProximityScoring from "../server/algo/scoring/ProximityScoring";
import { IsVegan } from "../server/algo/scoring/Vegan";
import { getPool } from "../server/query";

const EnvScorer = new EnvScoring();
const HealthScorer = new HealthScoring();
const PriceScorer = new PriceScoring();
const ProximityScorer = new ProximityScoring();

const writeFile = (path: string, data: any) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });

const query = async <T>(db: any, query: string) =>
  new Promise<T[]>((resolve, reject) => {
    db.all(query, (err: any, data: any) => {
      if (err) reject(err);
      resolve(data);
    });
  });

interface LeclercShop {
  CODE_MAGASIN: string;
  LIBELLE_MAGASIN: string;
  LATITUDE_GPS: number;
  CODE_POSTAL: string;
  LONGITUDE_GPS: number;
  NO_POINT_RETRAIT: string;
  URL_MOBILE: string;
}

interface LeclercArticle {
  ID_PRODUIT_WEB: number;
  CODE_EAN: string;
  LIBELLE_LIGNE_1: string;
  LIBELLE_LIGNE_2: string;
  FRAIS: boolean;
  SURGELE: boolean;
  PV_UNITAIRE_TTC: string;
  PRIX_UNITAIRE: string; // au kg
  ID_PHOTO_DETAIL: number;
  ID_PHOTO_EN_GRILLE: number;
  ID_PHOTO_EN_LISTE: number;
  ORIGINE: string;
  QTE_DISPONIBLE: string;
}

interface Article {
  name: string;
  brand: string;
  leclercId: string;
  photo: string;
  priceUnit: string;
  priceMass: string;
  ingredients: string[];
  packaging: string[];
  allergens: string[];
  nutriments: string[];
  labels: string[];
  nutriscore: string;
  scoreHealth: number;
  scoreEnvironment: number;
  bio: boolean;
  peanutFree: boolean;
  quantity: string;
  keywords: string[];
  origin: string;
}

interface LoginRequest {
  Token: string;
  Mag: string;
}

const sqlquery = async <T>(con: any, query: string, values?: string[]) => {
  return new Promise<T[]>((resolve, reject) => {
    con.query({ sql: query, values }, (err: any, results: any) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const sqlconnect = async () => {
  return new Promise<any>((resolve, reject) => {
    const con = mysql.createConnection(getPool());
    con.connect((err: any) => {
      if (err) reject(err);
      console.log("Connected to SQL");
      resolve(con);
    });
  });
};

const clear = (str: string) => {
  if (!str) return "";
  return str.replace(/œ/g, "oe").replace(/[^\x00-\xFF]/g, "");
};

const start = async () => {
  const sql = await sqlconnect();
  for (let _i_ = 2; _i_ < 5; _i_++) {
    const db = new sqlite.Database(
      `./server/drive-data/drive${_i_}.ashz`,
      (err: any) => {
        if (err) console.error(err);
      }
    );

    const tableNameQuery = await query<{ name: string }>(
      db,
      "SELECT name FROM sqlite_master where type='table' AND name LIKE '%_ARTICLES'"
    );
    const tableName = tableNameQuery[0].name;

    const articles = await query<LeclercArticle>(
      db,
      `SELECT * FROM ${tableName} LIMIT ${process.env.TEST ? 50 : 50000}`
    );

    await Promise.all(
      articles.map(async (article, i) => {
        await new Promise((r) => setTimeout(r, i * 50));
        const searchTerms = `${article.LIBELLE_LIGNE_1} ${
          article.LIBELLE_LIGNE_2
            ? article.LIBELLE_LIGNE_2.substr(
                0,
                article.LIBELLE_LIGNE_2.indexOf("-")
              )
            : ""
        }`.toLocaleLowerCase();

        let searchQuery = undefined;
        while (!searchQuery) {
          try {
            searchQuery = await fetch(
              `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURI(
                searchTerms
              )}&search_simple=1&action=process&json=true`
            );
          } catch {
            console.log(
              "Retrying fetch : " +
                `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURI(
                  searchTerms
                )}&search_simple=1&action=process&json=true`
            );
            await new Promise((r) => setTimeout(r, 5000));
          }
        }
        const offProducts = (await searchQuery.json()).products as any[];

        const leclercElems = [
          ...(article.LIBELLE_LIGNE_1?.split(" ").map((a) => a.trim()) ?? []),
          ...(article.LIBELLE_LIGNE_2?.split(" ").map((a) => a.trim()) ?? []),
        ].map((e) => (e ? e.toLocaleLowerCase() : e));

        let bestProduct = null;
        let bestMatchScore = 0;

        offProducts.forEach((product: any) => {
          if (!product || !product.product_name_fr) return;
          const offElems: string[] = [
            ...product.product_name_fr.split(" ").map((a: string) => a.trim()),
            product.quantity || product.nutrition_data_prepared_per,
            ...(product.brands_tags || []),
          ].map((e) => (e ? e.toLocaleLowerCase() : e));

          const matches = offElems.filter((le) =>
            leclercElems.find(
              (oe) => le && oe && (le.includes(oe) || oe.includes(le))
            )
          );
          var uniquematches = matches.filter((elem, index, self) => {
            return index === self.indexOf(elem);
          });
          const score = uniquematches.length;

          if (score > bestMatchScore) {
            bestMatchScore = score;
            bestProduct = product;
          }
        });

        if (bestProduct != null) {
          const product = await createProduct(article, bestProduct);
          let serialized = {
            ...product,
            brand: clear(product.brand),
            ingredients: clear((product.ingredients || []).join("|")),
            labels: clear((product.labels || []).join("|")),
            packaging: clear((product.packaging || []).join("|")),
            allergens: clear(product.allergens.toString()),
            nutriments: clear(product.nutriments.join("|")),
            keywords: clear((product.keywords || []).join("|")),
          };

          if (!serialized.ingredients || serialized.ingredients.length === 0) {
            return;
          }
          serialized.scoreEnvironment =
            EnvScorer.getScore(serialized).toString();
          serialized.scoreHealth = HealthScorer.getScore(serialized).toString();
          serialized.scorePrice = PriceScorer.getScore(serialized).toString();
          serialized.scoreProximity =
            ProximityScorer.getScore(serialized).toString();

          serialized.vegan = IsVegan(serialized);
          serialized.noGluten = IsNoGluten(serialized);
          serialized.bio = IsBio(serialized);
          serialized.peanutFree = IsPeanutFree(serialized);

          console.log(
            `Shop : ${_i_} Product: ${serialized.name} score_env: ${serialized.scoreEnvironment} score_health: ${serialized.scoreHealth} score_price: ${serialized.scorePrice} score_proximity: ${serialized.scoreProximity} bio: ${serialized.bio}  peanutFree: ${serialized.peanutFree}`
          );

          // console.log(
          //   `bio: ${serialized.bio}  peanutFree: ${serialized.peanutFree}`
          // );

          await sqlquery(
            sql,
            `INSERT INTO products${_i_} (name, leclercId, photo, brand, priceUnit, priceMass, ingredients, packaging, allergens, nutriments, nutriscore, healthScore, environmentScore, proximityScore, priceScore, quantity, keywords, vegan, noGluten, labels, bio, peanutFree) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
              clear(serialized.name),
              serialized.leclercId,
              serialized.photo,
              clear(serialized.brand),
              serialized.priceUnit,
              serialized.priceMass,
              clear(serialized.ingredients),
              clear(serialized.packaging),
              clear(serialized.allergens),
              clear(serialized.nutriments),
              serialized.nutriscore,
              serialized.scoreHealth,
              serialized.scoreEnvironment,
              serialized.scoreProximity,
              serialized.scorePrice,
              clear(serialized.quantity),
              clear(serialized.keywords),
              serialized.vegan,
              serialized.noGluten,
              serialized.labels,
              serialized.bio,
              serialized.peanutFree,
            ]
          );
        }
      })
    );
  }
};

const tab = ["a", "b", "c", "d", "e"];
const nutriscoreToInt = (str: string) => {
  let value = -1;
  tab.forEach((e, i) => {
    if (e === str) value = i + 1;
  });
  if (value === -1) return 0;
  return value;
};

const fillNutrimentsTab = (nutrimentsTab: string[], product: any) => {
  if (product.nutriments["energy-kcal"])
    nutrimentsTab.push(`energy-kcal:${product.nutriments["energy-kcal"]}`);
  if (product.nutriments.sugars_100g)
    nutrimentsTab.push(`sugars_100g:${product.nutriments.sugars_100g}`);
  if (product.nutriments.fiber_100g)
    nutrimentsTab.push(`fiber_100g:${product.nutriments.fiber_100g}`);
  if (product.nutriments.salt_100g)
    nutrimentsTab.push(`salt_100g:${product.nutriments.salt_100g}`);
  if (product.nutriments.fat_100g)
    nutrimentsTab.push(`fat_100g:${product.nutriments.fat_100g}`);
};

const quantityIdentifier = ["g", "ml", "L", "kg", "cl", "m", "pièce"];
const extractQuantity = (str: string): string => {
  try {
    let ret: string = `${str.match(/\d+/)![0]}:`;
    quantityIdentifier.forEach((e) => {
      if (str.search(e) !== -1) ret += `${e}`;
    });
    return ret;
  } catch (ex) {
    console.warn("Error parsing quantity : " + str + " ERROR : " + ex);
    return "Unknown";
  }
};
const createProduct = async (
  leclerc: LeclercArticle,
  product: any
): Promise<Article> => {
  let nutrimentsTab: string[] = [];
  fillNutrimentsTab(nutrimentsTab, product);

  const nutriscore = product.nutriscore_grade;
  const allergens_tags = product.allergens_tags;
  const ingredients_ids_debug = product.ingredients_ids_debug;
  //const ingredients_hierarchy = product.ingredients_hierarchy;
  const packaging = (product.packaging || "").split(",");
  const brands = product.brands;
  const name = product.product_name;
  const keywords = product._keywords;
  // search in leclerc db
  const quantity = extractQuantity(leclerc.LIBELLE_LIGNE_2);
  const princeMass = leclerc.PRIX_UNITAIRE;
  const priceUnit = leclerc.PV_UNITAIRE_TTC;
  const ecoScore = product?.ecoscore_data?.score ?? 0;

  const ret: Article = {
    allergens: allergens_tags,
    brand: brands,
    ingredients: ingredients_ids_debug,
    name: name,
    nutriments: nutrimentsTab,
    nutriscore: nutriscore,
    packaging: packaging,
    quantity: quantity,
    priceMass: princeMass,
    priceUnit: priceUnit,
    keywords,
    leclercId: leclerc.ID_PRODUIT_WEB,
    photo: leclerc.ID_PHOTO_DETAIL,
    labels: product.labels_tags ?? [],
    ecoscore: ecoScore,
    origin: leclerc.ORIGINE ?? product.origins ?? null,
  };
  return ret;
};

start()
  .then(() => {
    console.log("Ok");
    process.exit(0);
  })
  .catch((ex) => {
    console.warn(ex);
    process.exit(1);
  });

// export default start;
