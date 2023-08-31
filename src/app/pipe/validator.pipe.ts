import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { ArraySchema, ObjectSchema } from "joi";
import { CustomException } from "../../services/custom-exception";
import { EStatus } from "../../enums/EStatus";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | ArraySchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") {
      return value;
    }

    const { error } = this.schema.validate(value);
    console.log(error);
    if (error) {
      throw new CustomException(EStatus.BAD_REQUEST, error.message);
    }
    return value;
  }
}

type TFileImg = {
  [key: string]: Array<Express.Multer.File>;
};

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  constructor(private options: { maxSize: number }) {}

  transform(files: TFileImg, { type }: ArgumentMetadata) {
    if (["query", "body", "param"].includes(type)) {
      return files;
    }

    console.log("__files", files);
    if (!files) return files;

    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        files[key].forEach((item: Express.Multer.File) => {
          if (item.mimetype.split("/")[0] !== "image")
            throw new CustomException(
              EStatus.BAD_REQUEST,
              `Можна завантажувати лише зображення`,
            );

          if (item.size / (1024 * 1024) > this.options.maxSize)
            throw new CustomException(
              EStatus.BAD_REQUEST,
              `Файл занадто великий. Максимальний розмір ${this.options.maxSize}мб`,
            );
        });
      }
    }

    return files;
  }
}
