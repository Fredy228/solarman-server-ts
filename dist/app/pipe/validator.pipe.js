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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidatorPipe = exports.JoiValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("../../services/custom-exception");
const EStatus_1 = require("../../enums/EStatus");
let JoiValidationPipe = exports.JoiValidationPipe = class JoiValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        if (metadata.type !== "body") {
            return value;
        }
        const { error } = this.schema.validate(value);
        console.log(error);
        if (error) {
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, error.message);
        }
        return value;
    }
};
exports.JoiValidationPipe = JoiValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], JoiValidationPipe);
let ImageValidatorPipe = exports.ImageValidatorPipe = class ImageValidatorPipe {
    constructor(options) {
        this.options = options;
    }
    transform(files, { type }) {
        if (["query", "body", "param"].includes(type)) {
            return files;
        }
        console.log("__files", files);
        if (!files)
            return files;
        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key)) {
                files[key].forEach((item) => {
                    if (item.mimetype.split("/")[0] !== "image")
                        throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Можна завантажувати лише зображення`);
                    if (item.size / (1024 * 1024) > this.options.maxSize)
                        throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Файл занадто великий. Максимальний розмір ${this.options.maxSize}мб`);
                });
            }
        }
        return files;
    }
};
exports.ImageValidatorPipe = ImageValidatorPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ImageValidatorPipe);
//# sourceMappingURL=validator.pipe.js.map