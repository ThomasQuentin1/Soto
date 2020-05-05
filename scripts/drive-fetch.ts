// @ts-ignore
const fs = require("fs");
// @ts-ignore
const fetch = require("isomorphic-unfetch");
const sqlite = require("sqlite3").verbose();

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
}

const start = async () => {
  return createProduct(new Object() as LeclercArticle);
  if (!fs.existsSync("shops.db")) {
    const rawShops = await fetch(
      "https://m.leclercdrive.fr/MagasinsHandler.ashz?Build=100103012&Config=FRANCE&Desc=samsung%2BGT-I9195&LAD=1&Lang=fr&Locale=fr_FR&Marquage=1&Mod=100&OS=4.4.2&Signature=Qhf9qT%2BSIu6la9vnmU2bvxCxX%2F7CMs2Nwhwrl4%2BTJ6w%3D&Ver=10.1.3",
      {
        headers: {
          "User-Agent":
            "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)",
        },
      }
    );
    const shops = await rawShops.arrayBuffer();
    writeFile("shops.db", new Buffer(shops));
  }

  const db = new sqlite.Database("shops.db", (_err: any) => {});

  const tableNameQuery = await query<{ name: string }>(
    db,
    "SELECT name FROM sqlite_master where type='table' AND name LIKE '%MAGASINS'"
  );
  const tableName = tableNameQuery[0].name;

  const shopsQuery = await query<LeclercShop>(
    db,
    `SELECT * FROM ${tableName} LIMIT 1`
  );

  shopsQuery.forEach(async (s) => {
    if (!fs.existsSync(`catalogue-${s.CODE_MAGASIN}.db`)) {
      const rawCatalogue = await fetch(
        `${s.URL_MOBILE}056701/CatalogueHandler.ashz?Build=100103012&Club=1&Config=FRANCE&Desc=samsung%2BGT-I9195&Lang=fr&Locale=fr_FR&Marquage=1&Mod=100&OS=4.4.2&SansDetail=1&Signature=eA8IYdxeUqxZa8QfLnhxDntREjgU2CUAXicVulbP5Fs%3D&Stickers=1&Ver=10.1.3`,
        {
          headers: {
            "User-Agent":
              "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)",
          },
        }
      );
      const catalogue = await rawCatalogue.arrayBuffer();
      await writeFile(`catalogue-${s.CODE_MAGASIN}.db`, new Buffer(catalogue));
    }
  });
  createProduct;
};

const createProduct = async (_input: LeclercArticle): Promise<Article> => {
  const searchTerms = "Haricots verts notre jardin"; //_input.LIBELLE_LIGNE_1
  const res = await fetch(
    `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerms}&search_simple=1&action=process&json=true`
  );
  const data = await res.json();
  if (data.products.length === 1) {
    const product = data.products[0];
    const nutriments = product.nutriments;
    const nutriscore = product.nutriscore_grade;
    const allergens_tags = product.allergens_tags;
    const ingredients_ids_debug = product.ingredients_ids_debug;
    //const ingredients_hierarchy = product.ingredients_hierarchy;
    const packaging = product.packaging;
    const brands = product.brands;
    const name = product.product_name;

    // search in leclerc db
    const quantity = "TODO";
    const princeMass = "TODO";
    const priceUnit = "TODO";

    // need algo
    const scoreEnvironment = -1;
    const scoreHealth = -1;
    const ret = {
      allergens: allergens_tags,
      brand: brands,
      ingredients: ingredients_ids_debug,
      name: name,
      nutriments: nutriments,
      nutriscore: nutriscore,
      packaging: packaging,
      quantity: quantity,
      priceMass: princeMass,
      priceUnit: priceUnit,
      scoreEnvironment,
      scoreHealth,
    };
    console.log(ret);
    return ret;
  }
  //  console.log(data.products);
  return new Object() as Article;
};

start()
  .then(() => console.log("Ok"))
  .catch((ex) => console.warn(ex));

// export default start;
