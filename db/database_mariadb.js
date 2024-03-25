const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASS,
    connectionLimit: 5
});

module.exports = pool;