import fs from "fs";
import Database, { Database as DB, RunResult } from "better-sqlite3";
import { DB_FILE } from "../../appConfig";


export async function openDb(dbFile: string = DB_FILE): Promise<DB> {

    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, "");
    }

    const db = new Database(dbFile,
        {
            fileMustExist: false,
            verbose: undefined   // do we want to see the queries? could be set to console.log            
            // verbose: console.log
        });

    return db;
}

export async function runQuery(
    sql: string,
    params: Record<string, unknown> | unknown[] = []
): Promise<unknown[] | { changes: number; lastInsertRowid: number | bigint }> {

    console.log("about to run:");
    console.log(sql, params);

    const db = await openDb();
    const stmt = db.prepare(sql);

    if ((stmt as any).reader === true) {
        // SELECT
        return Array.isArray(params) ? stmt.all(...params) : stmt.all(params);
    } else {
        // INSERT/UPDATE/DELETE
        const res: RunResult = Array.isArray(params)
            ? stmt.run(...params)
            : stmt.run(params);
        return { changes: res.changes, lastInsertRowid: res.lastInsertRowid };
    }
}
