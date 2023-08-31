"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsService = void 0;
const uuid_1 = require("uuid");
const custom_exception_1 = require("../../services/custom-exception");
const EStatus_1 = require("../../enums/EStatus");
const ImageService_1 = require("../../services/ImageService");
const componentsDB_service_1 = require("./componentsDB.service");
const joiValidate_1 = require("../../services/joiValidate");
const EStoreType_1 = require("../../enums/EStoreType");
const path_1 = require("path");
const pagination_1 = require("../../services/pagination");
class ComponentsService {
    async create(photo, { title, type, cost, brand, country, descripCharacter, descripMain, optionSort, }) {
        if (!photo)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Ви не завантажили фото`);
        const idComponent = (0, uuid_1.v4)();
        const { error } = (0, joiValidate_1.componentsAddValidate)({
            descripCharacter: JSON.parse(descripCharacter),
            optionSort: JSON.parse(optionSort),
            descripMain: JSON.parse(descripMain),
        });
        if (error)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `${error.message}`);
        const pathPhoto = await ImageService_1.ImageService.save(photo[0], { width: 500, height: 500, fit: "inside" }, "images", "store", idComponent);
        return await (0, componentsDB_service_1.createComponent)({
            id: idComponent,
            title,
            type,
            cost,
            photo: pathPhoto,
            brand,
            country,
            optionSort,
            descripMain,
            descripCharacter,
        });
    }
    async getOptions(type) {
        let result = await (0, componentsDB_service_1.getComponents)(type);
        let sortBrand;
        let sortCountry;
        let sortSubtype = undefined;
        let sortPower = undefined;
        let sortMaterial = undefined;
        let sortReservoir = undefined;
        let sortVoltage = undefined;
        let sortPhases = undefined;
        const sortBrandV1 = result.filter((i) => i.brand !== "unknown");
        const sortBrandV2 = sortBrandV1.map((i) => i.brand);
        const sortBrandRes = [...new Set(sortBrandV2)];
        sortBrand = sortBrandRes.length > 0 ? sortBrandRes : undefined;
        const sortCountryV1 = result.filter((i) => i.country !== "unknown");
        const sortCountryV2 = sortCountryV1.map((i) => i.country);
        const sortCountryRes = [...new Set(sortCountryV2)];
        sortCountry = sortCountryRes.length > 0 ? sortCountryRes : undefined;
        if ([
            EStoreType_1.ETypeComponents.Panels,
            EStoreType_1.ETypeComponents.Inverters,
            EStoreType_1.ETypeComponents.Batteries,
            EStoreType_1.ETypeComponents.MountingHardware,
        ].includes(type)) {
            const sortSubtypeV1 = result.filter((i) => JSON.parse(i.optionSort).subtype);
            const sortSubtypeV2 = sortSubtypeV1.map((i) => JSON.parse(i.optionSort).subtype);
            const sortSubtypeRes = [...new Set(sortSubtypeV2)];
            sortSubtype = sortSubtypeRes.length > 0 ? sortSubtypeRes : undefined;
        }
        if ([EStoreType_1.ETypeComponents.Panels, EStoreType_1.ETypeComponents.Inverters].includes(type)) {
            const sortPowerV1 = result.filter((i) => JSON.parse(i.optionSort).power);
            const sortPowerV2 = sortPowerV1.map((i) => JSON.parse(i.optionSort).power);
            const sortPowerRes = [...new Set(sortPowerV2)];
            sortPowerRes.sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));
            sortPower = sortPowerRes.length > 0 ? sortPowerRes : undefined;
        }
        if ([EStoreType_1.ETypeComponents.MountingHardware].includes(type)) {
            const sortMaterialV1 = result.filter((i) => JSON.parse(i.optionSort).material);
            const sortMaterialV2 = sortMaterialV1.map((i) => JSON.parse(i.optionSort).material);
            const sortMaterialRes = [...new Set(sortMaterialV2)];
            sortMaterial = sortMaterialRes.length > 0 ? sortMaterialRes : undefined;
        }
        if ([EStoreType_1.ETypeComponents.Batteries].includes(type)) {
            const sortReservoirV1 = result.filter((i) => JSON.parse(i.optionSort).reservoir);
            const sortVoltageV1 = result.filter((i) => JSON.parse(i.optionSort).voltage);
            const sortReservoirV2 = sortReservoirV1.map((i) => JSON.parse(i.optionSort).reservoir);
            const sortVoltageV2 = sortVoltageV1.map((i) => JSON.parse(i.optionSort).voltage);
            const sortReservoirRes = [...new Set(sortReservoirV2)];
            const sortVoltageRes = [...new Set(sortVoltageV2)];
            sortReservoirRes.sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));
            sortVoltageRes.sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));
            sortVoltage = sortVoltageRes.length > 0 ? sortVoltageRes : undefined;
            sortReservoir =
                sortReservoirRes.length > 0 ? sortReservoirRes : undefined;
        }
        if ([EStoreType_1.ETypeComponents.Inverters].includes(type)) {
            const sortPhasesV1 = result.filter((i) => JSON.parse(i.optionSort).phases);
            const sortPhasesV2 = sortPhasesV1.map((i) => JSON.parse(i.optionSort).phases);
            const sortPhasesRes = [...new Set(sortPhasesV2)];
            sortPhasesRes.sort((a, b) => Number(a) - Number(b));
            sortPhases = sortPhasesRes.length > 0 ? sortPhasesRes : undefined;
        }
        return {
            sortBrand,
            sortCountry,
            sortMaterial,
            sortPhases,
            sortPower,
            sortReservoir,
            sortSubtype,
            sortVoltage,
        };
    }
    async getAll(type, limit, page) {
        const result = await (0, componentsDB_service_1.getComponents)(type);
        return (0, pagination_1.paginationFn)(result, limit, page);
    }
    async getById(id) {
        const findComponent = await (0, componentsDB_service_1.getOneComponent)(id);
        if (!findComponent)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.NOT_FOUND, `Компонент по id: ${id} не знайдено`);
        return findComponent;
    }
    async deleteById(id) {
        const findComponent = await this.getById(id);
        const filePathFolder = path_1.default.join(__dirname, "..", "..", "..", "static", "images", "store", `${findComponent.id}`);
        await ImageService_1.ImageService.deleteFolders([filePathFolder]);
        await (0, componentsDB_service_1.deleteComponents)(id);
    }
}
exports.ComponentsService = ComponentsService;
//# sourceMappingURL=components.service.js.map