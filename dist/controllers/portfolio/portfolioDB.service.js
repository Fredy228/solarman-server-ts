"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderPosts = exports.updatePost = exports.deletePosts = exports.getPostById = exports.getPosts = exports.createPost = exports.toConnectDB = void 0;
const sqlite3_1 = require("sqlite3");
const sql = (0, sqlite3_1.verbose)();
const toConnectDB = () => {
    return new sql.Database("database/portfolio.db", (err) => {
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
const createPost = async ({ title, year, components, urlImg, galleryUrl, id, }) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        const dateCreated = Date.now();
        db.run(`INSERT INTO portfolio(id, title, year, components, urlImg, dateCreated, series, galleryUrl) VALUES(?,?,?,?,?,?,?,?)`, [id, title, year, components, urlImg, dateCreated, 0, galleryUrl], function (err) {
            if (err)
                reject(err.message);
            const newPost = {
                id,
                title,
                year,
                components,
                urlImg,
                galleryUrl,
            };
            resolve(newPost);
        });
        toCloseDB(db);
    });
};
exports.createPost = createPost;
const getPosts = () => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.all(`SELECT * FROM portfolio`, [], function (err, rows) {
            if (err)
                reject(err.message);
            resolve(rows);
        });
        toCloseDB(db);
    });
};
exports.getPosts = getPosts;
const getPostById = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.get(`SELECT * FROM portfolio WHERE id = ?`, [id], (err, row) => {
            if (err)
                reject(err.message);
            resolve(row);
        });
        toCloseDB(db);
    });
};
exports.getPostById = getPostById;
const deletePosts = (id) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`DELETE FROM portfolio WHERE id = ?`, [id], function (err) {
            if (err)
                reject(err.message);
            resolve("OK");
        });
        toCloseDB(db);
    });
};
exports.deletePosts = deletePosts;
const updatePost = ({ id, title, year, components, urlImg, galleryUrl, }) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        db.run(`UPDATE portfolio SET title = COALESCE(?, title), year = COALESCE(?, year), components = COALESCE(?, components), urlImg = COALESCE(?, urlImg), galleryUrl = COALESCE(?, galleryUrl) WHERE id = ?`, [title, year, components, urlImg, galleryUrl, id], function (err) {
            if (err)
                reject(err.message);
            db.get(`SELECT * FROM portfolio WHERE id = ?`, [id], function (err, row) {
                if (err)
                    reject(err.message);
                resolve(row);
            });
        });
        toCloseDB(db);
    });
};
exports.updatePost = updatePost;
const updateOrderPosts = (objects) => {
    return new Promise((resolve, reject) => {
        const db = (0, exports.toConnectDB)();
        objects.forEach((element) => {
            const { id, series } = element;
            db.run("UPDATE portfolio SET series = ? WHERE id = ?", [series, id], function (err) {
                if (err)
                    reject(err.message);
            });
        });
        resolve("OK");
        toCloseDB(db);
    });
};
exports.updateOrderPosts = updateOrderPosts;
//# sourceMappingURL=portfolioDB.service.js.map