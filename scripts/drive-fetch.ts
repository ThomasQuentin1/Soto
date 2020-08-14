// @ts-ignore
const fs = require("fs");
// @ts-ignore
const fetch = require("isomorphic-unfetch");
const sqlite = require("sqlite3").verbose();
const mysql = require("mysql");

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
  keywords : string[];
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
      database: "algo",
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
  const db = new sqlite.Database("catalogue.db", (_err: any) => {});

  const tableNameQuery = await query<{ name: string }>(
    db,
    "SELECT name FROM sqlite_master where type='table' AND name LIKE '%ARTICLES'"
  );
  const tableName = tableNameQuery[0].name;

  const articles = await query<LeclercArticle>(
    db,
    `SELECT * FROM ${tableName} LIMIT 50 OFFSET 110`
  );

  await Promise.all(
    articles.map(async (article) => {
      const searchTerms = `${
        article.LIBELLE_LIGNE_1
      } ${article.LIBELLE_LIGNE_2.substr(
        0,
        article.LIBELLE_LIGNE_2.indexOf("-")
      )}`.toLocaleLowerCase();

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
        const final = await createProduct(article, bestProduct);
        await sqlquery(
          sql,
          "INSERT INTO products (name, brand, priceUnit, priceMass, ingredients, packaging, allergens, nutriments, nutriscore, healthScore, environmentScore, quantity, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            final.name,
            final.brand,
            final.priceUnit,
            final.priceMass,
            final.ingredients.join("|"),
            final.packaging.join("|"),
            final.allergens.toString(),
            final.nutriments.join("|"),
            final.nutriscore,
            final.scoreHealth.toString(),
            final.scoreEnvironment.toString(),
            final.quantity,
            final.keywords.join("|")
          ]
        );
      }
    })
  );

  // if (!fs.existsSync("shops.db")) {
  //   const rawShops = await fetch(
  //     "https://m.leclercdrive.fr/MagasinsHandler.ashz?Build=100103012&Config=FRANCE&Desc=samsung%2BGT-I9195&LAD=1&Lang=fr&Locale=fr_FR&Marquage=1&Mod=100&OS=4.4.2&Signature=Qhf9qT%2BSIu6la9vnmU2bvxCxX%2F7CMs2Nwhwrl4%2BTJ6w%3D&Ver=10.1.3",
  //     {
  //       headers: {
  //         "User-Agent":
  //           "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)",
  //       },
  //     }
  //   );
  //   const shops = await rawShops.arrayBuffer();
  //   writeFile("shops.db", new Buffer(shops));
  // }

  // const db = new sqlite.Database("shops.db", (_err: any) => { });

  // const tableNameQuery = await query<{ name: string }>(
  //   db,
  //   "SELECT name FROM sqlite_master where type='table' AND name LIKE '%MAGASINS'"
  // );
  // const tableName = tableNameQuery[0].name;

  // const shopsQuery = await query<LeclercShop>(
  //   db,
  //   `SELECT * FROM ${ tableName } LIMIT 1`
  // );

  // shopsQuery.forEach(async s => {
  //   if (!fs.existsSync(`catalogue - ${ s.CODE_MAGASIN }.db`)) {
  //     const rawLogin = await fetch(`${ s.URL_MOBILE }LoginHandler.ashz`, {
  //       method: "POST",
  //       headers: {
  //         "User-Agent": "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Cookie": `datadome = 8.ivgKc - C4uU6mlDdWtj8zTlxGvNCJyq5kJt6_cT~cdHeOxoEl76Fw2atTF7_ZpVMf3r2cjwZHuFs9KzeIG_Mf6iAjrij3lg2lmiK27ca2; clsWCSD107: ContexteMU =@d=2 % 7c056701; clsWCCD125: @056701=sid = 2000; Canal = sCANAL = AM; clsWDMA053: @056701=z = 3282 % 7c3235 % 7c3292; ASP.NET_SessionId = cozuwohlbiqnlbxbreac0wkp; clsWCSD155: clsWCSD155_ClientUnique = 991112c3 - 23e3 - 4960 - 9d68 - 83793d339d9d; MacId = id = 4b3c5fba - 57b0 - 4521 - a991 - a35e49c4d14b; .XPRSDRVAUTH = 1382CAE0254170B64A0E3B29AEC34CBBB77E4B79D6768BBB018B8E8B92F8FD7EA04F93F70DCA4D7066C73851D983C51C6556038E0DC695C8D5DD793564520C3A6DE8FF5D26A50CB565226C562C4C6751E6F976A96356A76CCE2A1441FF67235EE6915F4FC9B31D6C8B48B8E1169E03DFE5C696068A516219B2415E33BEAF03BE465B4E3A61785C86934544384BF87E84B6B61FF84BBE59C4E9899F91AAE6FC1DD5AFF00015E983B5262E61557CA3689845B58044BC57CE20739F41539D1BC624C253E7C356739155EB583EE1776922486DA39920; AuthPerm = Auth = Perm; clsWDMA040: Didact = ee = 0 & e=0 & d="2010-01-01T00:00:00" & c=false & n=0 & a=00000000000000000; cdrivesr2 = 5ccba3d8dc3cbd9b9adbcf68c0cd12b6e11fb497fbdd0a3fe46b80f6decdrivesr2 = 5ccba3d8dc3cbd9b9adbcf68c0cd12b6e11fb497fbdd0a3fe46b80f6de9bbf28d178ed33`,
  //         "Host": "fd12-m.leclercdrive.fr",
  //         "Connection": "Keep-Alive",
  //       },
  //       body: `Build = 100103012 & Config=FRANCE & Desc=samsung % 2BGT - I9195 & Identifiants=tom.florentin % 40epitech.eu_ -* -_Bienbien88 *& Lang=fr & Locale=fr_FR & Marquage=1 & Mod=100 & OS=4.4.2 & Signature=fb9FC1NCVT % 2BCypJh9NoTZpS5Bvd88SYkjYLMos6sIdI % 3D & Ver=10.1.3`
  //     });
  //     const loginTxt = await rawLogin.text();
  //     console.log(loginTxt);
  //     const login = JSON.parse(loginTxt) as LoginRequest;
  //     const cookie = rawLogin.headers.get("set-cookie");

  //     if (!login.Token)
  //       throw "can't login";

  //     const rawCatalogue = await fetch(`${ s.URL_MOBILE } CatalogueHandler.ashz ? Build = 100103012 & Club=1 & Config=FRANCE & Desc=samsung % 2BGT - I9195 & Lang=fr & Locale=fr_FR & Marquage=1 & Mod=100 & OS=4.4.2 & SansDetail=1 & Signature=% 2FK3Z4edpqGNrHGt4YZypBIcoaN3i % 2BdfF2iqUJz % 2Fh % 2BRs % 3D & Stickers=1 & Ver=10.1.3`,
  //       {
  //         headers: {
  //           "User-Agent": "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)",
  //           "Accept-Encoding": "gzip",
  //           "Accept": "application/octet-stream,application/json",
  //           "Cookie": cookie!
  //         }
  //       });
  //     console.log(rawCatalogue.url);
  //     const catalogue = await rawCatalogue.arrayBuffer();
  //     await writeFile(`catalogue - ${ s.CODE_MAGASIN }.db`, new Buffer(catalogue));
  //   }
  // });
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
const keywords = product._keywords
  // search in leclerc db
  const quantity = extractQuantity(leclerc.LIBELLE_LIGNE_2);
  const princeMass = leclerc.PRIX_UNITAIRE;
  const priceUnit = leclerc.PV_UNITAIRE_TTC;

  // need algo
  const scoreEnvironment = Math.floor(Math.random() * 100);
  const scoreHealth = nutriscoreToInt(nutriscore) * 20;
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
    scoreEnvironment,
    scoreHealth,
    keywords
  };
  return ret;
};

start()
  .then(() => console.log("Ok"))
  .catch((ex) => console.warn(ex));

// export default start;
