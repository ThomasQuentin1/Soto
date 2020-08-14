// @ts-nocheck
// @ts-ignore
const mysql = require("mysql");

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

    await sqlquery(sql, "CREATE TABLE users (id INT AUTO_INCREMENT primary key NOT NULL, token VARCHAR(64), email VARCHAR(255) NOT NULL, password VARCHAR(64) NOT NULL);");
    await sqlquery(sql, "CREATE TABLE criterions (userId INT, id INT NOT NULL, position TINYINT, FOREIGN KEY(userId) REFERENCES users(id));");
    await sqlquery(sql, "CREATE TABLE obligations (userId INT, id INT NOT NULL, FOREIGN KEY(userId) REFERENCES users(id));");
}

start()
    .then(() => { console.log("Ok"); process.exit(0) })
    .catch((ex) => { console.warn(ex); process.exit(1) });
