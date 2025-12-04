import { Database as DB } from "better-sqlite3";
import { openDb, runQuery } from "./dal";


function initDbSchema(db: DB): void {

const ddl = `
CREATE TABLE BankAccounts (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    account_number  TEXT NOT NULL UNIQUE,
    customer_name   TEXT NOT NULL
);

CREATE TABLE AccountOperations (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    account         INTEGER NOT NULL,
    action_type     TEXT NOT NULL CHECK (action_type IN ('withdrawal','deposit','loan')),
    amount          REAL NOT NULL,
    operation_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    interest        REAL,
    payments        INTEGER,
    FOREIGN KEY (account) REFERENCES BankAccounts(id)
);
`;



    db.exec("BEGIN");
    try {
        db.exec(ddl);
        db.exec("COMMIT");
    } catch (e) {
        db.exec("ROLLBACK");
        throw e;
    }
}

async function generateSampleData() {
/*await runQuery(`
INSERT INTO BankAccounts (account_number, customer_name) 
VALUES
    ('IL010023456789001', 'David Cohen'),
    ('IL020045678912345', 'Sarah Levi'),
    ('IL030067891234567', 'Moshe Mizrahi'),
    ('IL040089123456789', 'Yael Katz'),
    ('IL050012345678901', 'Ronen Shapiro'),
    ('IL060034567890123', 'Tamar Goldstein'),
    ('IL070056789012345', 'Eli Rosen'),
    ('IL080078901234567', 'Noa Friedman'),
    ('IL090091234567890', 'Yossi Ben-David'),
    ('IL100012345678902', 'Maya Azulay');
`);*/
await runQuery(`
INSERT INTO AccountOperations (account, action_type, amount, interest, payments) 
VALUES
    (1, 'deposit', 1200, NULL, NULL),
    (2, 'withdrawal', 500, NULL, NULL),
    (3, 'loan', 8000, 6.5, 24),
    (4, 'deposit', 2000, NULL, NULL),
    (5, 'withdrawal', 750, NULL, NULL),
    (6, 'loan', 15000, 5.2, 36),
    (7, 'deposit', 3000, NULL, NULL),
    (8, 'withdrawal', 400, NULL, NULL),
    (9, 'loan', 5000, 7.8, 12),
    (10, 'deposit', 1800, NULL, NULL);
`);

}

//openDb().then((db: any) => {
//initDbSchema(db);
//console.log("Done init DB");
//})

generateSampleData();
console.log("done init DB");

