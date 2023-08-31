"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singToken = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const singToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
});
exports.singToken = singToken;
//# sourceMappingURL=createToken.js.map