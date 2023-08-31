import { ETypeComponents } from "../enums/EStoreType";
export type PaginationBaseType = {
    limit: number;
    page: number;
};
export type TPaginationComponents = {
    type: ETypeComponents;
} & PaginationBaseType;
