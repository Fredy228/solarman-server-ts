"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactApp = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let ReactApp = exports.ReactApp = class ReactApp {
    use(_, res) {
        res.sendFile((0, path_1.join)(__dirname, "..", "..", "build", "index.html"));
    }
};
exports.ReactApp = ReactApp = __decorate([
    (0, common_1.Injectable)()
], ReactApp);
//# sourceMappingURL=reactApp.middleware.js.map