"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioModule = void 0;
const common_1 = require("@nestjs/common");
const protect_middleware_1 = require("../../middlewares/protect.middleware");
const portfolio_controller_1 = require("./portfolio.controller");
const portfolio_service_1 = require("./portfolio.service");
let PortfolioModule = exports.PortfolioModule = class PortfolioModule {
    configure(consumer) {
        consumer.apply(protect_middleware_1.ProtectMiddleware).forRoutes({ path: "api/admin/portfolio", method: common_1.RequestMethod.POST }, { path: "api/admin/portfolio/:idPost", method: common_1.RequestMethod.DELETE }, {
            path: "api/admin/portfolio/image/:idPost",
            method: common_1.RequestMethod.DELETE,
        }, { path: "api/admin/portfolio/:idPost", method: common_1.RequestMethod.PATCH }, { path: "api/admin/portfolio/order", method: common_1.RequestMethod.PATCH });
    }
};
exports.PortfolioModule = PortfolioModule = __decorate([
    (0, common_1.Module)({
        controllers: [portfolio_controller_1.PortfolioController],
        providers: [portfolio_service_1.PortfolioService],
    })
], PortfolioModule);
//# sourceMappingURL=portfolio.module.js.map