"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./controllers/user/user.module");
const protect_middleware_1 = require("./middlewares/protect.middleware");
const reactApp_middleware_1 = require("./middlewares/reactApp.middleware");
const portfolio_module_1 = require("./controllers/portfolio/portfolio.module");
let MainModule = exports.MainModule = class MainModule {
    configure(consumer) {
        consumer.apply(reactApp_middleware_1.ReactApp).exclude("api/(.*)").forRoutes("*");
    }
};
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, portfolio_module_1.PortfolioModule],
        providers: [protect_middleware_1.ProtectMiddleware],
    })
], MainModule);
//# sourceMappingURL=main.module.js.map