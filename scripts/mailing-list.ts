//@ts-nocheck
import { getPool } from "../server/query";

// @ts-ignore
const mysql = require("mysql");

const fs = require("fs");

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

  const data = (await sqlquery(sql, "SELECT email FROM users WHERE mailingList IS TRUE")).map(e => e.email);
  fs.writeFileSync("mailingList.json", data);
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
