// @ts-nocheck
// @ts-ignore
const mysql = require("mysql");

const insertProduct =
  "(id INT AUTO_INCREMENT primary key NOT NULL, leclercId VARCHAR(64), name VARCHAR(255), brand VARCHAR(64), priceUnit INT, priceMass VARCHAR(64), ingredients VARCHAR(1024), packaging VARCHAR(1024), allergens VARCHAR(256), nutriments VARCHAR(1024), nutriscore VARCHAR(2), healthscore INT, environmentScore INT, quantity VARCHAR(16), keywords VARCHAR(1024))";
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

const sqlquery = async <T>(con: any, query: string, values?: string[]) => {
  return new Promise<T[]>((resolve, reject) => {
    con.query({ sql: query, values }, (err: any, results: any) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const start = async () => {
  const sql = await sqlconnect();

  await sqlquery(sql, "DROP TABLE IF EXISTS obligations;");
  await sqlquery(sql, "DROP TABLE IF EXISTS criterions;");
  await sqlquery(sql, "DROP TABLE IF EXISTS users;");
  await sqlquery(sql, "DROP TABLE IF EXISTS carts;");
  await sqlquery(sql, "DROP TABLE IF EXISTS products1;");
  await sqlquery(sql, "DROP TABLE IF EXISTS products2;");
  await sqlquery(sql, "DROP TABLE IF EXISTS products3;");
  await sqlquery(sql, "DROP TABLE IF EXISTS products4;");

  await sqlquery(
    sql,
    "CREATE TABLE users (id INT AUTO_INCREMENT primary key NOT NULL, token VARCHAR(64), email VARCHAR(255) NOT NULL, password VARCHAR(64) NOT NULL, cartId INT, shopId INT, pushToken VARCHAR(64));"
  );
  await sqlquery(
    sql,
    "CREATE TABLE criterions (userId INT, id INT NOT NULL, position TINYINT, FOREIGN KEY(userId) REFERENCES users(id));"
  );
  await sqlquery(
    sql,
    "CREATE TABLE obligations (userId INT, id INT NOT NULL, FOREIGN KEY(userId) REFERENCES users(id));"
  );
  await sqlquery(
    sql,
    "CREATE TABLE carts (id INT NOT NULL, userId INT NOT NULL, productId INT NOT NULL, driveId INT NOT NULL, date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);"
  );
  await sqlquery(sql, `CREATE TABLE products1 ${insertProduct};`);
  await sqlquery(sql, `CREATE TABLE products2 ${insertProduct};`);
  await sqlquery(sql, `CREATE TABLE products3 ${insertProduct};`);
  await sqlquery(sql, `CREATE TABLE products4 ${insertProduct};`);
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
