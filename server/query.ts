import * as mysql from "mysql";

export const getPool = () => {
  if (process.env.TEST) {
    console.log("db test");
    return {
      host: "51.11.241.109",
      user: "soto",
      password: "s0t0lefeu!",
      database: "algo",
    };
  } else {
    console.log("db prod");
    return {
      host: "51.11.241.109",
      user: "soto",
      password: "s0t0lefeu!",
      database: "users",
    };
  }
};
const algoPool = mysql.
(getPool());
const usersPool = mysql.createPool(getPool());

export const algoQuery = async <T>(query: string, values?: string[]) => {
  return new Promise<T[]>((resolve, reject) => {
    algoPool.query({ sql: query, values }, (err: any, results: any) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const usersQuery = async <T>(query: string, values?: string[]) => {
  return new Promise<T[]>((resolve, reject) => {
    usersPool.query({ sql: query, values }, (err: any, results: any) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

let connections = 0;

export const openConnection = () => {
  connections += 1;
};

let timeout;

export const endConnection = async () =>
  new Promise<void>((resolve) => {
    if (connections != 0) {
      connections -= 1;
      resolve();
      if (timeout)
        clearTimeout(timeout);
    } else {
      timeout = setTimeout(() => {
        algoPool?.end();
        usersPool?.end();
        resolve();
      }, 5000);
    }
  });
