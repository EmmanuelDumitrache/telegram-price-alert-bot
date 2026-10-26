
import Database from "better-sqlite3";

const db = new Database("tg-alerts.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS targets (
        chat_id INTEGER NOT NULL,
        coin TEXT NOT NULL,
        target_price REAL NOT NULL,
        alerted INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (chat_id, coin)
    )
`);

const columns = db.prepare(`     
    PRAGMA table_info(targets)
`).all() as { name: string }[];

if (!columns.some((column) => column.name === "alerted")) {
    db.exec(`
        ALTER TABLE targets
        ADD COLUMN alerted INTEGER NOT NULL DEFAULT 0
    `);
}

const tables = db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type = 'table'
`).all();

console.log("Database tables:", tables);

export default db;
