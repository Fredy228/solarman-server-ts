import { ETypeComponents, ETypeSets } from "../enums/EStoreType";
export type TypeStoreCharacter = {
    subtitle: string;
    option: string[];
};
interface IStoreBase {
    id: string;
    title: string;
    cost: number;
    photo: string;
    descripMain: string[];
    descripCharacter: TypeStoreCharacter[];
}
export interface IStoreComponents extends IStoreBase {
    type: ETypeSets;
    brand: string;
    country: string;
    optionSort: string;
}
export type TypeSetsComponent = {
    image: string;
} & TypeStoreCharacter;
export interface IStoreSets extends IStoreBase {
    type: ETypeComponents;
    power: string;
    descripPhoto: string;
    home: {
        value: boolean;
        series: number;
    };
    components: TypeSetsComponent[];
}
export interface ISortOption {
    sortBrand?: string[];
    sortCountry?: string[];
    sortMaterial?: string[];
    sortPhases?: string[];
    sortPower?: string[];
    sortReservoir?: string[];
    sortSubtype?: string[];
    sortVoltage?: string[];
}
export {};
