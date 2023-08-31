"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentsAddValidate = exports.CreateStoreComponentsSchema = exports.CreateStoreSetsSchema = exports.updateOrderSchema = exports.updatePostSchema = exports.deletePostImgSchema = exports.createPostSchema = exports.userUpdateSchema = exports.userCreateSchema = exports.contactsValidator = void 0;
const joi_1 = require("joi");
const EStoreType_1 = require("../enums/EStoreType");
const EUserRole_1 = require("../enums/EUserRole");
exports.contactsValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(20).required(),
    phone: joi_1.default.string()
        .pattern(/^(\+38)?\s?(\(0\d{2}\)|0\d{2})[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/)
        .required(),
    email: joi_1.default.string().email(),
}).options({ stripUnknown: true });
exports.userCreateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[a-zA-Z0-9_\-\.]{2,20}$/)
        .min(2)
        .max(20)
        .required(),
    role: joi_1.default.string()
        .valid(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator, EUserRole_1.UserRole.User)
        .default(EUserRole_1.UserRole.User),
    password: joi_1.default.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/)
        .required(),
}).options({ stripUnknown: true });
exports.userUpdateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[a-zA-Z0-9_\-\.]{2,20}$/)
        .min(2)
        .max(20),
    email: joi_1.default.string().email(),
    role: joi_1.default.string().valid(EUserRole_1.UserRole.Admin, EUserRole_1.UserRole.Moderator, EUserRole_1.UserRole.User),
    password: joi_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/),
}).options({ stripUnknown: true });
exports.createPostSchema = joi_1.default.object({
    title: joi_1.default.string().min(20).max(80).required(),
    year: joi_1.default.string().max(4).required(),
    components: joi_1.default.string().required(),
});
exports.deletePostImgSchema = joi_1.default.object({
    urlMini: joi_1.default.string().required(),
});
exports.updatePostSchema = joi_1.default.object({
    title: joi_1.default.string().min(20).max(80),
    year: joi_1.default.string().max(4),
    components: joi_1.default.string(),
}).options({ stripUnknown: true });
exports.updateOrderSchema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.string().required(),
    series: joi_1.default.number().required(),
}));
exports.CreateStoreSetsSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).max(80).required(),
    type: joi_1.default.string()
        .valid(EStoreType_1.ETypeSets.All, EStoreType_1.ETypeSets.GreenTariff, EStoreType_1.ETypeSets.AutonomousStations, EStoreType_1.ETypeSets.BackupPower, EStoreType_1.ETypeSets.HybridUPS, EStoreType_1.ETypeSets.ForEnterprises)
        .required(),
    cost: joi_1.default.number().min(0).required(),
    power: joi_1.default.string().min(2).max(10).required(),
    descripMain: joi_1.default.string().required(),
    descripCharacter: joi_1.default.string().required(),
    components: joi_1.default.string().required(),
}).options({ stripUnknown: true });
exports.CreateStoreComponentsSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).max(80).required(),
    type: joi_1.default.string()
        .valid(EStoreType_1.ETypeComponents.All, EStoreType_1.ETypeComponents.Panels, EStoreType_1.ETypeComponents.Inverters, EStoreType_1.ETypeComponents.Batteries, EStoreType_1.ETypeComponents.MountingHardware, EStoreType_1.ETypeComponents.Components, EStoreType_1.ETypeComponents.ChargingStations)
        .required(),
    cost: joi_1.default.number().min(0).required(),
    brand: joi_1.default.string().min(2).max(20).default("unknown"),
    country: joi_1.default.string().min(2).max(20).default("unknown"),
    descripMain: joi_1.default.string().required(),
    descripCharacter: joi_1.default.string().required(),
    optionSort: joi_1.default.string().required(),
}).options({ stripUnknown: true });
const componentsAddValidate = (data) => joi_1.default.object()
    .keys({
    descripMain: joi_1.default.array().items(joi_1.default.string()),
    optionSort: joi_1.default.object({
        subtype: joi_1.default.string(),
        material: joi_1.default.string(),
        power: joi_1.default.string(),
        voltage: joi_1.default.string(),
        phases: joi_1.default.string(),
        reservoir: joi_1.default.string(),
    }),
    descripCharacter: joi_1.default.array().items(joi_1.default.object({
        subtitle: joi_1.default.string(),
        option: joi_1.default.array().items(joi_1.default.string()),
    })),
})
    .validate(data);
exports.componentsAddValidate = componentsAddValidate;
//# sourceMappingURL=joiValidate.js.map