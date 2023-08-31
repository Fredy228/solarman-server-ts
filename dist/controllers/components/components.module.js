"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsModule = void 0;
const common_1 = require("@nestjs/common");
const protect_middleware_1 = require("../../middlewares/protect.middleware");
let ComponentsModule = exports.ComponentsModule = class ComponentsModule {
    configure(consumer) {
        consumer.apply(protect_middleware_1.ProtectMiddleware).forRoutes({ path: "api/admin/store-components", method: common_1.RequestMethod.POST }, {
            path: "api/admin/store-components/:idComponent",
            method: common_1.RequestMethod.DELETE,
        }, {
            path: "api/admin/store-components/:idComponent",
            method: common_1.RequestMethod.PATCH,
        });
    }
};
exports.ComponentsModule = ComponentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
    })
], ComponentsModule);
//# sourceMappingURL=components.module.js.map