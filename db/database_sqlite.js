const sqlite3 = require('sqlite3').verbose();
const dotenv = require("dotenv");
dotenv.config();
const dbsrc = process.env.SQLITE_PATH;

let db = new sqlite3.Database(dbsrc, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.');
        let d = new Date().toLocaleTimeString("es-ES");
        console.log(`Time: ${d}`);
    }
});

module.exports = db;