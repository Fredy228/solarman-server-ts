/// <reference types="multer" />
import { ComponentsDto } from "./components.dto";
import { ISortOption, IStoreComponents } from "../../interfaces/IStore";
import { ETypeComponents } from "../../enums/EStoreType";
export declare class ComponentsService {
    create(photo: Array<Express.Multer.File>, { title, type, cost, brand, country, descripCharacter, descripMain, optionSort, }: ComponentsDto): Promise<IStoreComponents>;
    getOptions(type: ETypeComponents): Promise<ISortOption>;
    getAll(type: ETypeComponents, limit: number, page: number): Promise<IStoreComponents[]>;
    getById(id: string): Promise<IStoreComponents>;
    deleteById(id: string): Promise<void>;
}
