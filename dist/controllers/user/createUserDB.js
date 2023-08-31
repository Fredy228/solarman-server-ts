"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userDB_service_1 = require("./userDB.service");
function createUserDB() {
    const db = (0, userDB_service_1.toConnectDB)();
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, result) => {
        if (err) {
            console.error(err.message);
        }
        if (!result) {
            db.run("CREATE TABLE users (id TEXT, name TEXT, email TEXT, role TEXT, password TEXT, token TEXT)", (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Таблица users создана.");
            });
        }
        else {
            console.log("Таблица users уже существует.");
        }
    });
}
createUserDB();
//# sourceMappingURL=createUserDB.js.map