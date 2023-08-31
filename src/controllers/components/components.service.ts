import { v4 as uuidv4 } from "uuid";
import { ComponentsDto } from "./components.dto";
import { CustomException } from "../../services/custom-exception";
import { EStatus } from "../../enums/EStatus";
import { ImageService } from "../../services/ImageService";
import {
  createComponent,
  deleteComponents,
  getComponents,
  getOneComponent,
} from "./componentsDB.service";
import { componentsAddValidate } from "../../services/joiValidate";
import { ISortOption, IStoreComponents } from "../../interfaces/IStore";
import { ETypeComponents } from "../../enums/EStoreType";
import { TOptionSort } from "../../types/storeType";
import path from "path";
import { paginationFn } from "../../services/pagination";

export class ComponentsService {
  async create(
    photo: Array<Express.Multer.File>,
    {
      title,
      type,
      cost,
      brand,
      country,
      descripCharacter,
      descripMain,
      optionSort,
    }: ComponentsDto,
  ): Promise<IStoreComponents> {
    if (!photo)
      throw new CustomException(EStatus.BAD_REQUEST, `Ви не завантажили фото`);

    const idComponent = uuidv4();

    const { error } = componentsAddValidate({
      descripCharacter: JSON.parse(descripCharacter),
      optionSort: JSON.parse(optionSort),
      descripMain: JSON.parse(descripMain),
    });

    if (error)
      throw new CustomException(EStatus.BAD_REQUEST, `${error.message}`);

    const pathPhoto: string = await ImageService.save(
      photo[0],
      { width: 500, height: 500, fit: "inside" },
      "images",
      "store",
      idComponent,
    );

    return await createComponent({
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

  async getOptions(type: ETypeComponents): Promise<ISortOption> {
    let result = await getComponents(type);

    let sortBrand: undefined | string[];
    let sortCountry: undefined | string[];
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

    if (
      [
        ETypeComponents.Panels,
        ETypeComponents.Inverters,
        ETypeComponents.Batteries,
        ETypeComponents.MountingHardware,
      ].includes(type)
    ) {
      const sortSubtypeV1 = result.filter(
        (i) => JSON.parse(i.optionSort).subtype,
      );
      const sortSubtypeV2 = sortSubtypeV1.map(
        (i) => JSON.parse(i.optionSort).subtype,
      );
      const sortSubtypeRes = [...new Set(sortSubtypeV2)];
      sortSubtype = sortSubtypeRes.length > 0 ? sortSubtypeRes : undefined;
    }

    if ([ETypeComponents.Panels, ETypeComponents.Inverters].includes(type)) {
      const sortPowerV1 = result.filter((i) => JSON.parse(i.optionSort).power);
      const sortPowerV2 = sortPowerV1.map(
        (i) => JSON.parse(i.optionSort).power,
      );
      const sortPowerRes = [...new Set(sortPowerV2)];
      sortPowerRes.sort(
        (a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]),
      );
      sortPower = sortPowerRes.length > 0 ? sortPowerRes : undefined;
    }

    if ([ETypeComponents.MountingHardware].includes(type)) {
      const sortMaterialV1 = result.filter(
        (i) => JSON.parse(i.optionSort).material,
      );
      const sortMaterialV2 = sortMaterialV1.map(
        (i) => JSON.parse(i.optionSort).material,
      );
      const sortMaterialRes = [...new Set(sortMaterialV2)];
      sortMaterial = sortMaterialRes.length > 0 ? sortMaterialRes : undefined;
    }

    if ([ETypeComponents.Batteries].includes(type)) {
      const sortReservoirV1 = result.filter(
        (i) => JSON.parse(i.optionSort).reservoir,
      );
      const sortVoltageV1 = result.filter(
        (i) => JSON.parse(i.optionSort).voltage,
      );
      const sortReservoirV2 = sortReservoirV1.map(
        (i) => JSON.parse(i.optionSort).reservoir,
      );
      const sortVoltageV2 = sortVoltageV1.map(
        (i) => JSON.parse(i.optionSort).voltage,
      );
      const sortReservoirRes = [...new Set(sortReservoirV2)];
      const sortVoltageRes = [...new Set(sortVoltageV2)];
      sortReservoirRes.sort(
        (a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]),
      );
      sortVoltageRes.sort(
        (a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]),
      );
      sortVoltage = sortVoltageRes.length > 0 ? sortVoltageRes : undefined;
      sortReservoir =
        sortReservoirRes.length > 0 ? sortReservoirRes : undefined;
    }

    if ([ETypeComponents.Inverters].includes(type)) {
      const sortPhasesV1 = result.filter(
        (i) => JSON.parse(i.optionSort).phases,
      );
      const sortPhasesV2 = sortPhasesV1.map(
        (i) => JSON.parse(i.optionSort).phases,
      );
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

  async getAll(
    type: ETypeComponents,
    limit: number,
    page: number,
  ): Promise<IStoreComponents[]> {
    const result = await getComponents(type);
    return paginationFn(result, limit, page);
  }

  async getById(id: string): Promise<IStoreComponents> {
    const findComponent = await getOneComponent(id);

    if (!findComponent)
      throw new CustomException(
        EStatus.NOT_FOUND,
        `Компонент по id: ${id} не знайдено`,
      );

    return findComponent;
  }

  async deleteById(id: string): Promise<void> {
    const findComponent = await this.getById(id);

    const filePathFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "static",
      "images",
      "store",
      `${findComponent.id}`,
    );

    await ImageService.deleteFolders([filePathFolder]);

    await deleteComponents(id);
  }
}
