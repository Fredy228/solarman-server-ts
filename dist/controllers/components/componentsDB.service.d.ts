import { Database } from "sqlite3";
import { IStoreComponents } from "../../interfaces/IStore";
import { ComponentsDto } from "./components.dto";
import { ETypeComponents } from "../../enums/EStoreType";
export declare const toConnectDB: () => Database;
export declare const createComponent: ({ id, title, type, cost, photo, brand, country, optionSort, descripMain, descripCharacter, }: ComponentsDto) => Promise<IStoreComponents>;
export declare const getComponents: (type: ETypeComponents) => Promise<IStoreComponents[]>;
export declare const getOneComponent: (id: string) => Promise<IStoreComponents>;
export declare const deleteComponents: (id: string) => Promise<void>;
