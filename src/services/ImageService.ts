import * as sharp from "sharp";
import { join } from "path";
import { ensureDir, unlink, removeSync } from "fs-extra";
import { v4 as uuidv4 } from "uuid";

import { EStatus } from "../enums/EStatus";
import { IOptionImage } from "../interfaces/IImage";
import { CustomException } from "./custom-exception";

export class ImageService {
  static async save(
    file: Express.Multer.File,
    options: IOptionImage,
    ...pathSegments: string[]
  ): Promise<string> {
    const fileName = `${uuidv4()}.webp`;
    const fullFilePath = join(process.cwd(), "static", ...pathSegments);

    await ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat("webp")
      .webp({ quality: 85 })
      .toFile(join(fullFilePath, fileName));

    return join(...pathSegments, fileName);
  }

  static async saveMany(
    files: Array<Express.Multer.File>,
    options: IOptionImage,
    ...pathSegments: string[]
  ): Promise<Array<string>> {
    const fullFilePath = join(process.cwd(), "static", ...pathSegments);
    await ensureDir(fullFilePath);

    const arrFilesPath: string[] = await Promise.all(
      files.map(async (file: Express.Multer.File): Promise<string> => {
        const fileName = `${uuidv4()}.webp`;

        await sharp(file.buffer)
          .resize(options || { height: 500, width: 500 })
          .toFormat("webp")
          .webp({ quality: 85 })
          .toFile(join(fullFilePath, fileName));

        return join(...pathSegments, fileName);
      }),
    );

    return arrFilesPath;
  }

  static async deleteImages(filePaths: string[]): Promise<void> {
    try {
      await Promise.all(filePaths.map((filePath: string) => unlink(filePath)));
      console.log("Картинки успешно удалены");
    } catch (err) {
      console.error(err);
      throw new CustomException(
        EStatus.BAD_REQUEST,
        "Помилка при видаленні файлу",
      );
    }
  }
  static async deleteFolders(folderPaths: string[]): Promise<void> {
    try {
      await Promise.all(
        folderPaths.map((folderPath: string) => removeSync(folderPath)),
      );
      console.log("Папки успешно удалены");
    } catch (err) {
      throw new CustomException(
        EStatus.BAD_REQUEST,
        "Помилка при видаленні файлу",
      );
    }
  }
}
