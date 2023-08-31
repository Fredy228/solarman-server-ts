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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../guard/roles.guard");
const roles_decorator_1 = require("../../guard/roles.decorator");
const EUserRole_1 = require("../../enums/EUserRole");
const user_dto_1 = require("./user.dto");
const validator_pipe_1 = require("../../app/pipe/validator.pipe");
const joiValidate_1 = require("../../services/joiValidate");
const user_service_1 = require("./user.service");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(userBody) {
        return this.userService.registerUser(userBody);
    }
    async login(userBody) {
        return this.userService.loginUser(userBody);
    }
    async logout(req) {
        const { user } = req;
        return this.userService.logoutUser(user);
    }
    checkAuth() {
        return "Authorized";
    }
    getAll() {
        return this.userService.getAllUsers();
    }
    async delete(id) {
        return this.userService.deleteUserById(id);
    }
    async updateRole(userName, BodyRole) {
        return this.userService.updateRoleUser(userName, BodyRole.role);
    }
    async updateMe(req, updateUser) {
        const { user } = req;
        return this.userService.updateUser(user.id, updateUser);
    }
    async updatePass(req, passBody) {
        const { user } = req;
        return this.userService.updatePassUser(user, passBody);
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    (0, common_1.HttpCode)(201),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.userCreateSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/logout"),
    (0, common_1.HttpCode)(204),
    (0, roles_decorator_1.Roles)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("/check-auth"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "checkAuth", null);
__decorate([
    (0, common_1.Get)("/users"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)("/update-role/:userName"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(EUserRole_1.UserRole.Admin),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.userUpdateSchema)),
    __param(0, (0, common_1.Param)("userName")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.RoleUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)("/update-me"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.userUpdateSchema)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Patch)("/update-pass"),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.userUpdateSchema)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdatePassUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePass", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("api/admin"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map