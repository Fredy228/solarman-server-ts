"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
exports.hashPassword = hashPassword;
const checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);
exports.checkPassword = checkPassword;
//# sourceMappingURL=hashPassword.js.map