/// @ts-nocheck
// @ts-ignore
const fs = require("fs");
// @ts-ignore
const fetch = require("isomorphic-unfetch");
const sqlite = require("sqlite3").verbose();
const mysql = require("mysql");
import EnvScoring from "../server/algo/scoring/EnvScoring";
import HealthScoring from "../server/algo/scoring/HealthScoring";

const EnvScorer = new EnvScoring();
const HealthScorer = new HealthScoring();

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
  priceUnit: string;
  priceMass: string;
  ingredients: string[];
  packaging: string[];
  allergens: string[];
  nutriments: string[];
  nutriscore: string;
  scoreHealth: number;
  scoreEnvironment: number;
  quantity: string;
  keywords: string[];
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
    const con = mysql.createConnection({
      host: "51.11.241.109",
      user: "soto",
      password: "s0t0lefeu!",
      database: "users",
    });
    con.connect((err: any) => {
      if (err) reject(err);
      console.log("Connected to SQL");
      resolve(con);
    });
  });
};

const start = async () => {
  const sql = await sqlconnect();
  const db = new sqlite.Database("catalogue.db", (err: any) => {
    if (err) console.error(_err);
  });

  const tableNameQuery = await query<{ name: string }>(
    db,
    "SELECT name FROM sqlite_master where type='table' AND name LIKE '%_ARTICLES'"
  );
  const tableName = tableNameQuery[0].name;

  const articles = await query<LeclercArticle>(
    db,
    `SELECT * FROM ${tableName} LIMIT 50 OFFSET 110`
  );

  await Promise.all(
    articles.map(async (article) => {
      const searchTerms =
        `${article.LIBELLE_LIGNE_1} ${article.LIBELLE_LIGNE_2.substr(
          0,
          article.LIBELLE_LIGNE_2.indexOf("-")
        )}`?.toLocaleLowerCase() ?? "";

      const searchQuery = await fetch(
        `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURI(
          searchTerms
        )}&search_simple=1&action=process&json=true`
      );
      const offProducts = (await searchQuery.json()).products as any[];

      const leclercElems = [
        ...article.LIBELLE_LIGNE_1.split(" ").map((a) => a.trim()),
        ...article.LIBELLE_LIGNE_2.split(" ").map((a) => a.trim()),
      ].map((e) => (e ? e.toLocaleLowerCase() : e));

      let bestProduct = null;
      let bestMatchScore = 0;

      offProducts.forEach((product: any) => {
        if (!product) return;
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

      if (bestProduct == null) console.log("Product not found");
      else {
        const product = await createProduct(article, bestProduct);
        let serialized = {
          ...product,
          ingredients: product.ingredients.join("|"),
          packaging: product.packaging.join("|"),
          allergens: product.allergens.toString(),
          nutriments: product.nutriments.join("|"),
          keywords: product.keywords.join("|"),
        };

        serialized.scoreEnvironment = EnvScorer.getScore(serialized).toString();
        serialized.scoreHealth = HealthScorer.getScore(serialized).toString();

        console.log(
          `Product: ${serialized.name} score_env: ${serialized.scoreEnvironment} score_health: ${serialized.scoreHealth}`
        );

        await sqlquery(
          sql,
          "INSERT INTO products3 (name, leclercId, brand, priceUnit, priceMass, ingredients, packaging, allergens, nutriments, nutriscore, healthScore, environmentScore, quantity, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            serialized.name,
            serialized.leclercId,
            serialized.brand,
            serialized.priceUnit,
            serialized.priceMass,
            serialized.ingredients,
            serialized.packaging,
            serialized.allergens,
            serialized.nutriments,
            serialized.nutriscore,
            serialized.scoreHealth,
            serialized.scoreEnvironment,
            serialized.quantity,
            serialized.keywords,
          ]
        );
      }
    })
  );
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
  let ret: string = `${str.match(/\d+/)![0]}:`;
  quantityIdentifier.forEach((e) => {
    if (str.search(e) !== -1) ret += `${e}`;
  });
  return ret;
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
  };
  return ret;
};

start()
  .then(() => console.log("Ok"))
  .catch((ex) => console.warn(ex));

// export default start;
