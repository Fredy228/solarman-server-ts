"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const sharp = require("sharp");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const uuid_1 = require("uuid");
const EStatus_1 = require("../enums/EStatus");
const custom_exception_1 = require("./custom-exception");
class ImageService {
    static async save(file, options, ...pathSegments) {
        const fileName = `${(0, uuid_1.v4)()}.webp`;
        const fullFilePath = (0, path_1.join)(process.cwd(), "static", ...pathSegments);
        await (0, fs_extra_1.ensureDir)(fullFilePath);
        await sharp(file.buffer)
            .resize(options || { height: 500, width: 500 })
            .toFormat("webp")
            .webp({ quality: 85 })
            .toFile((0, path_1.join)(fullFilePath, fileName));
        return (0, path_1.join)(...pathSegments, fileName);
    }
    static async saveMany(files, options, ...pathSegments) {
        const fullFilePath = (0, path_1.join)(process.cwd(), "static", ...pathSegments);
        await (0, fs_extra_1.ensureDir)(fullFilePath);
        const arrFilesPath = await Promise.all(files.map(async (file) => {
            const fileName = `${(0, uuid_1.v4)()}.webp`;
            await sharp(file.buffer)
                .resize(options || { height: 500, width: 500 })
                .toFormat("webp")
                .webp({ quality: 85 })
                .toFile((0, path_1.join)(fullFilePath, fileName));
            return (0, path_1.join)(...pathSegments, fileName);
        }));
        return arrFilesPath;
    }
    static async deleteImages(filePaths) {
        try {
            await Promise.all(filePaths.map((filePath) => (0, fs_extra_1.unlink)(filePath)));
            console.log("Картинки успешно удалены");
        }
        catch (err) {
            console.error(err);
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, "Помилка при видаленні файлу");
        }
    }
    static async deleteFolders(folderPaths) {
        try {
            await Promise.all(folderPaths.map((folderPath) => (0, fs_extra_1.removeSync)(folderPath)));
            console.log("Папки успешно удалены");
        }
        catch (err) {
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, "Помилка при видаленні файлу");
        }
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map