import * as mysql from "mysql";

const algoPool = mysql.createPool({
    host: "51.11.241.109",
    user: "soto",
    password: "s0t0lefeu!",
    database: 'algo'
});

const usersPool = mysql.createPool({
    host: "51.11.241.109",
    user: "soto",
    password: "s0t0lefeu!",
    database: 'users'
});

export const algoQuery = async <T>(query: string, values?: string[]) => {
    return new Promise<T[]>((resolve, reject) => {
        algoPool.query({ sql: query, values }, (err: any, results: any) => {
            if (err)
                reject(err);
            resolve(results);
        });
    })
}

export const usersQuery = async <T>(query: string, values?: string[]) => {
    return new Promise<T[]>((resolve, reject) => {
        usersPool.query({ sql: query, values }, (err: any, results: any) => {
            if (err)
                reject(err);
            resolve(results);
        });
    })
}