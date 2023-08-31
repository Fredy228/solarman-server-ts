/// <reference types="multer" />
import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { ArraySchema, ObjectSchema } from "joi";
export declare class JoiValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ObjectSchema | ArraySchema);
    transform(value: any, metadata: ArgumentMetadata): any;
}
type TFileImg = {
    [key: string]: Array<Express.Multer.File>;
};
export declare class ImageValidatorPipe implements PipeTransform {
    private options;
    constructor(options: {
        maxSize: number;
    });
    transform(files: TFileImg, { type }: ArgumentMetadata): TFileImg;
}
export {};
