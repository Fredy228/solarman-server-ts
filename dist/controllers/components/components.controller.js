"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../guard/roles.guard");
const components_service_1 = require("./components.service");
const roles_decorator_1 = require("../../guard/roles.decorator");
const EUserRole_1 = require("../../enums/EUserRole");
const validator_pipe_1 = require("../../app/pipe/validator.pipe");
const joiValidate_1 = require("../../services/joiValidate");
const platform_express_1 = require("@nestjs/platform-express");
const components_dto_1 = require("./components.dto");
const EStoreType_1 = require("../../enums/EStoreType");
let ComponentsController = exports.ComponentsController = class ComponentsController {
    constructor(componentsService) {
        this.componentsService = componentsService;
    }
    async create(files, bodyComponent) {
        return this.componentsService.create(files.photo, bodyComponent);
    }
    async getOption(type = EStoreType_1.ETypeComponents.All) {
        return this.componentsService.getOptions(type);
    }
    async getById(id) {
        return this.componentsService.getById(id);
    }
    async deleteById(id) {
        return this.componentsService.deleteById(id);
    }
    async getAll({ limit = 6, page = 1, type = EStoreType_1.ETypeComponents.All }) {
        return this.componentsService.getAll(type, limit, page);
    }
};
__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.HttpCode)(201),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.CreateStoreComponentsSchema), new validator_pipe_1.ImageValidatorPipe({ maxSize: 1 })),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: "photo", maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, components_dto_1.ComponentsDto]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/option"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Query)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "getOption", null);
__decorate([
    (0, common_1.Get)("/:idComponent"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Param)("idComponent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)("/:idComponent"),
    (0, common_1.HttpCode)(204),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    __param(0, (0, common_1.Param)("idComponent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "getAll", null);
exports.ComponentsController = ComponentsController = __decorate([
    (0, common_1.Controller)("api/admin/store-components"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [components_service_1.ComponentsService])
], ComponentsController);
//# sourceMappingURL=components.controller.js.map