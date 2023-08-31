"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectMiddleware = void 0;
const jwt = require("jsonwebtoken");
const custom_exception_1 = require("../services/custom-exception");
const common_1 = require("@nestjs/common");
const userDB_service_1 = require("../controllers/user/userDB.service");
const EStatus_1 = require("../enums/EStatus");
let ProtectMiddleware = exports.ProtectMiddleware = class ProtectMiddleware {
    async use(req, _, next) {
        const token = req.headers.authorization?.startsWith("Bearer") &&
            req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.UNAUTHORIZED, "Not authorized");
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await (0, userDB_service_1.getUserById)(decodedToken.id);
        if (!currentUser) {
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.UNAUTHORIZED, "Not authorized");
        }
        req.user = currentUser;
        next();
    }
};
exports.ProtectMiddleware = ProtectMiddleware = __decorate([
    (0, common_1.Injectable)()
], ProtectMiddleware);
//# sourceMappingURL=protect.middleware.js.map