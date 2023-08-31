/// <reference types="multer" />
import { ComponentsService } from "./components.service";
import { ComponentsDto } from "./components.dto";
import { ISortOption, IStoreComponents } from "../../interfaces/IStore";
import { ETypeComponents } from "../../enums/EStoreType";
import { TPaginationComponents } from "../../types/paginationType";
export declare class ComponentsController {
    private readonly componentsService;
    constructor(componentsService: ComponentsService);
    create(files: {
        photo?: Array<Express.Multer.File>;
    }, bodyComponent: ComponentsDto): Promise<IStoreComponents>;
    getOption(type?: ETypeComponents): Promise<ISortOption>;
    getById(id: string): Promise<IStoreComponents>;
    deleteById(id: string): Promise<void>;
    getAll({ limit, page, type }: TPaginationComponents): Promise<IStoreComponents[]>;
}
