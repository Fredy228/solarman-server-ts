"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComponents = exports.getOneComponent = exports.getComponents = exports.createComponent = exports.toConnectDB = void 0;
const sqlite3_1 = require("sqlite3");
const EStoreType_1 = require("../../enums/EStoreType");
const sql = (0, sqlite3_1.verbose)();
const toConnectDB = () => {
    return new sql.Database("database/store.db", (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database.");
    });
};
exports.toConnectDB = toConnectDB;
const toCloseDB = (db) => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the database connection.");
    });
};
const createComponent = async ({ id, title, type, cost, photo, brand, country, optionSort, descripMain, descripCharacter, }) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`INSERT INTO components(id, title , type , cost , photo , brand , country , optionSort , descripMain, descripCharacter ) VALUES(?,?,?,?,?,?,?,?,?,?)`, [
            id,
            title,
            type,
            cost,
            photo,
            brand,
            country,
            optionSort,
            descripMain,
            descripCharacter,
        ], function (err) {
            if (err)
                reject(err);
            resolve({
                id,
                title,
                type,
                cost,
                photo,
                brand,
                country,
                optionSort: JSON.parse(optionSort),
                descripMain: JSON.parse(descripMain),
                descripCharacter: JSON.parse(descripCharacter),
            });
        });
        toCloseDB(db);
    });
};
exports.createComponent = createComponent;
const getComponents = (type) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        let query = "SELECT * FROM components";
        if (type !== EStoreType_1.ETypeComponents.All) {
            query += ` WHERE type = ?`;
            db.all(query, [type], function (err, rows) {
                if (err)
                    reject(err.message);
                resolve(rows);
            });
        }
        if (type === EStoreType_1.ETypeComponents.All) {
            db.all(query, function (err, rows) {
                if (err)
                    reject(err.message);
                resolve(rows);
            });
        }
        toCloseDB(db);
    });
};
exports.getComponents = getComponents;
const getOneComponent = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.get(`SELECT * FROM components WHERE id = ?`, [id], (err, row) => {
            if (err)
                reject(err.message);
            resolve(row);
        });
        toCloseDB(db);
    });
};
exports.getOneComponent = getOneComponent;
const deleteComponents = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`DELETE FROM components WHERE id = ?`, [id], function (err) {
            if (err)
                reject(err);
            resolve();
        });
        toCloseDB(db);
    });
};
exports.deleteComponents = deleteComponents;
const updateComponent = ({ id, title, type, cost, photo, brand, country, optionSort, descripMain, descripCharacter, }) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`UPDATE components SET title = COALESCE(?, title), type = COALESCE(?, type), cost = COALESCE(?, cost), photo = COALESCE(?, photo), brand = COALESCE(?, brand), country = COALESCE(?, country), optionSort = COALESCE(?, optionSort), descripMain = COALESCE(?, descripMain), descripCharacter = COALESCE(?, descripCharacter) WHERE id = ?`, [
            title,
            type,
            cost,
            photo,
            brand,
            country,
            optionSort,
            descripMain,
            descripCharacter,
            id,
        ], function (err) {
            if (err)
                reject(err.message);
            db.get(`SELECT * FROM components WHERE id = ?`, [id], function (err, row) {
                if (err)
                    reject(err.message);
                resolve(row);
            });
        });
        toCloseDB(db);
    });
};
//# sourceMappingURL=componentsDB.service.js.map