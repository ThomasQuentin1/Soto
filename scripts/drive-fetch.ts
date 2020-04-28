const fs = require("fs");
// @ts-ignore
const fetch = require("isomorphic-unfetch");
const sqlite = require("sqlite3").verbose();

const writeFile = (path: string, data: any) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err: any) => {
        if (err)
            reject(err);
        resolve();
    });
});

const query = async <T>(db: any, query: string) => new Promise<T[]>((resolve, reject) => {
    db.all(query, (err: any, data: any) => {
        if (err)
            reject(err);
        resolve(data);
    });
});

interface Shop {
    CODE_MAGASIN: string;
    LIBELLE_MAGASIN: string;
    LATITUDE_GPS: number;
    CODE_POSTAL: string;
    LONGITUDE_GPS: number;
    NO_POINT_RETRAIT: string;
}

const start = async () => {
    if (!fs.existsSync("shops.db")) {
        const rawShops = await fetch("https://m.leclercdrive.fr/MagasinsHandler.ashz?Build=100103012&Config=FRANCE&Desc=samsung%2BGT-I9195&LAD=1&Lang=fr&Locale=fr_FR&Marquage=1&Mod=100&OS=4.4.2&Signature=Qhf9qT%2BSIu6la9vnmU2bvxCxX%2F7CMs2Nwhwrl4%2BTJ6w%3D&Ver=10.1.3",
            { headers: { "User-Agent": "LeclercDrive/100103012 Dalvik/1.6.0 (Linux; U; Android 4.4.2; GT-I9195 Build/KOT49H)" } });
        const shops = await rawShops.arrayBuffer();
        writeFile("shops.db", new Buffer(shops));
    }


    const db = new sqlite.Database("shops.db", (err: any) => {
        console.log(err);
    });

    const tableNameQuery = await query<{ name: string }>(db, "SELECT name FROM sqlite_master where type='table' AND name LIKE '%MAGASINS'");
    const tableName = tableNameQuery[0].name;

    const shopsQuery = await query<Shop>(db, `SELECT * FROM ${tableName}`);

    shopsQuery.forEach(s => console.log(s.LIBELLE_MAGASIN));
}

start().then(() => console.log("Ok")).catch(ex => console.warn(ex));