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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const validator_pipe_1 = require("../../app/pipe/validator.pipe");
const joiValidate_1 = require("../../services/joiValidate");
const client_dto_1 = require("./client.dto");
let ClientController = exports.ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async sendOnTelegram(bodyMessage) {
        return this.clientService.sendSmsTelegram(bodyMessage);
    }
    async sendQuiz(bodyQuiz) {
        return this.clientService.sendQuizTelegram(bodyQuiz);
    }
};
__decorate([
    (0, common_1.Post)("/telegram"),
    (0, common_1.HttpCode)(204),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.contactsValidator)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "sendOnTelegram", null);
__decorate([
    (0, common_1.Post)("/quiz"),
    (0, common_1.HttpCode)(204),
    (0, common_1.UsePipes)(new validator_pipe_1.JoiValidationPipe(joiValidate_1.contactsValidator)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.QuizDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "sendQuiz", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)("api/phone-send"),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map