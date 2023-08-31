/// <reference types="multer" />
import { IOptionImage } from "../interfaces/IImage";
export declare class ImageService {
    static save(file: Express.Multer.File, options: IOptionImage, ...pathSegments: string[]): Promise<string>;
    static saveMany(files: Array<Express.Multer.File>, options: IOptionImage, ...pathSegments: string[]): Promise<Array<string>>;
    static deleteImages(filePaths: string[]): Promise<void>;
    static deleteFolders(folderPaths: string[]): Promise<void>;
}
