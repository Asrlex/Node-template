const sqlite3 = require('sqlite3').verbose()
const dotenv = require("dotenv");
dotenv.config();
const dbsrc = process.env.dbsrc;
const fs = require('fs');

let db = new sqlite3.Database(dbsrc, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.');

        let query = ``;
        let params = ['2023-09-01', '2023-09-01'];
        exQ(query, params);
    }
});

const exQ = (query, params = []) => {
    db.all(query, params, (err, rows) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log(rows);
        }
    });
};

const exQandOutput = (query, params = []) => {
    db.all(query, params, (err, rows) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            let filepath = './uploads/test/test.json';
            fs.writeFile(filepath, JSON.stringify(rows), err => {
                if (err) {
                    console.error(err);
                }
                console.log(`File ${filepath} has been created`);
            });
        }
    });
}