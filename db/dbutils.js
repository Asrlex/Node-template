const db = require('../server.js').db;

module.exports.ejecutarQueryInsertMultiple = async (query, coleccion, plhol) => {
    let placeholders = coleccion.map(() => plhol).join(", ");
    query += placeholders;
    let flat = [];
    coleccion.forEach((arr) => { arr.forEach((item) => { flat.push(item) }) });
    return new Promise((resolve, reject) => {
        db.run(query, flat, (err, rows) => {
            if (err) {
                reject(`${err}`);
            }
            resolve(true);
        });
    })
}

module.exports.ejecutarQueryInsertSingular = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err, rows) => {
            if (err) {
                reject(`${err}`);
            }
            resolve(true);
        });
    })
}

module.exports.ejecutarQueryConsultaMultiple = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(`${err}`);
            } else {
                resolve(rows);
            }
        });
    })
}

module.exports.ejecutarQueryConsultaSingular = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, result) => {
            if (err) {
                reject(`${err}`);
            }
            if (result != undefined) {
                resolve(result);
            }
            resolve(false);
        });
    })
}

module.exports.ejecutarQueryUpdate = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err, rows) => {
            if (err) {
                reject(`${err}`);
            }
            resolve(true);
        });
    })
}

module.exports.genericQueries = {
    findDuplicates: `
        select * from ?
        where ? in (
            select ? from ?
            group by ?
            having count(*) > 1
        )`,
    findPagination: `
        select * from ?
        limit ? offset ?`,
    findGroupByHavingCount: `
        select ? from ?
        group by ?
        having count(*) > ?`,
    findItemsAndMaxDate: `
        
    `
}