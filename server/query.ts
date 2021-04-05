import * as mysql from "mysql";

export const getPool = () => {
  if (process.env && process.env.TEST && process.env.TEST === "TRUE")
    return {
      host: "51.11.241.109",
      user: "soto",
      password: "s0t0lefeu!",
      database: "algo",
    };
  else
    return {
      host: "51.11.241.109",
      user: "soto",
      password: "s0t0lefeu!",
      database: "users",
    };
};
const algoPool = mysql.createPool({
  host: "51.11.241.109",
  user: "soto",
  password: "s0t0lefeu!",
  database: "algo",
});

const usersPool = mysql.createPool(getPool());
console.log("usersPool");
console.log(usersPool);

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

export const endConnection = async () =>
  new Promise<void>((resolve) => {
    if (connections != 0) {
      connections -= 1;
      resolve();
    } else {
      setTimeout(() => {
        algoPool.end();
        usersPool.end();
        resolve();
      }, 1000);
    }
  });
