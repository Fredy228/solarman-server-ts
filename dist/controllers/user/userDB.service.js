"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePass = exports.updateUser = exports.deleteUser = exports.getUserByName = exports.getUserById = exports.getUsers = exports.createUser = exports.toConnectDB = void 0;
const sqlite3_1 = require("sqlite3");
const uuid_1 = require("uuid");
const hashPassword_1 = require("../../services/hashPassword");
const createToken_1 = require("../../services/createToken");
const sql = (0, sqlite3_1.verbose)();
const toConnectDB = () => {
    return new sql.Database("database/users.db", (err) => {
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
const createUser = async (newUser) => {
    const hashedPass = await (0, hashPassword_1.hashPassword)(newUser.password);
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        const id = (0, uuid_1.v4)();
        const token = (0, createToken_1.singToken)(id);
        db.run(`INSERT INTO users(id, name, email, role, password, token) VALUES(?,?,?,?,?,?)`, [
            id,
            newUser.name,
            "solarmanua@gmail.com",
            newUser.role,
            hashedPass,
            token,
        ], function (err) {
            if (err)
                reject(err.message);
            const createdUser = {
                id,
                name: newUser.name,
                email: "solarmanua@gmail.com",
                role: newUser.role,
                token,
            };
            resolve(createdUser);
        });
        toCloseDB(db);
    });
};
exports.createUser = createUser;
const getUsers = () => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.all(`SELECT * FROM users`, [], function (err, rows) {
            if (err)
                reject(err.message);
            console.log(rows);
            resolve(rows);
        });
        toCloseDB(db);
    });
};
exports.getUsers = getUsers;
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
            if (err)
                reject(err.message);
            resolve(row);
        });
        toCloseDB(db);
    });
};
exports.getUserById = getUserById;
const getUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.get(`SELECT * FROM users WHERE name = ?`, [name], (err, row) => {
            if (err)
                reject(err.message);
            resolve(row);
        });
        toCloseDB(db);
    });
};
exports.getUserByName = getUserByName;
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
            if (err)
                reject(err.message);
            resolve("OK");
        });
        toCloseDB(db);
    });
};
exports.deleteUser = deleteUser;
const updateUser = ({ name, email, role, token, id, }) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), role = COALESCE(?, role), token = COALESCE(?, token) WHERE id = ?`, [name, email, role, token, id], function (err) {
            if (err)
                reject(err.message);
            db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
                if (err)
                    reject(err.message);
                resolve(row);
            });
        });
        toCloseDB(db);
    });
};
exports.updateUser = updateUser;
const updatePass = async ({ password, id, }) => {
    const hashedPass = await (0, hashPassword_1.hashPassword)(password);
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`UPDATE users SET password = COALESCE(?, password) WHERE id = ?`, [hashedPass, id], function (err) {
            if (err)
                reject(err.message);
            db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
                if (err)
                    reject(err.message);
                resolve(row);
            });
        });
        toCloseDB(db);
    });
};
exports.updatePass = updatePass;
//# sourceMappingURL=userDB.service.js.map