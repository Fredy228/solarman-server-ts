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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../guard/roles.guard");
const portfolio_service_1 = require("./portfolio.service");
const validator_pipe_1 = require("../../app/pipe/validator.pipe");
const roles_decorator_1 = require("../../guard/roles.decorator");
const EUserRole_1 = require("../../enums/EUserRole");
const joiValidate_1 = require("../../services/joiValidate");
const platform_express_1 = require("@nestjs/platform-express");
const custom_exception_1 = require("../../services/custom-exception");
const EStatus_1 = require("../../enums/EStatus");
const portfolio_dto_1 = require("./portfolio.dto");
let PortfolioController = exports.PortfolioController = class PortfolioController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    async changeOrder(orders) {
        return this.portfolioService.orderChange(orders);
    }
    async create(files, postBody) {
        if (!files.photo || !files.gallery)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, "Ви не завантажили всі зображення");
        return await this.portfolioService.postCreate(postBody, files.photo, files.gallery);
    }
    async getAll({ limit = 6, page = 1 }) {
        return this.portfolioService.getAllPost(limit, page);
    }
    async getById(id) {
        return this.portfolioService.getById(id);
    }
    async delete(id) {
        return await this.portfolioService.postDelete(id);
    }
    async deletePostImg(id, { urlMini }) {
        return this.portfolioService.postImageDelete(id, urlMini);
    }
    async postUpdate(files, id, bodyPost) {
        return this.portfolioService.postUpdate(id, bodyPost, files);
    }
};
__decorate([
    (0, common_1.Patch)("/order"),
    (0, common_1.HttpCode)(204),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.updateOrderSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "changeOrder", null);
__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.HttpCode)(201),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.createPostSchema), new validator_pipe_1.ImageValidatorPipe({ maxSize: 10 })),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "photo", maxCount: 1 },
        { name: "gallery", maxCount: 12 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, portfolio_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/:idPost"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Param)("idPost")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)("/:idPost"),
    (0, common_1.HttpCode)(204),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    __param(0, (0, common_1.Param)("idPost")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)("/image/:idPost"),
    (0, common_1.HttpCode)(204),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.deletePostImgSchema)),
    __param(0, (0, common_1.Param)("idPost")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deletePostImg", null);
__decorate([
    (0, common_1.Patch)("/:idPost"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.updatePostSchema), new validator_pipe_1.ImageValidatorPipe({ maxSize: 10 })),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "photo", maxCount: 1 },
        { name: "gallery", maxCount: 12 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)("idPost")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, portfolio_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "postUpdate", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)("api/admin/portfolio"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map