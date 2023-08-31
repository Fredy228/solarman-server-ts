import { HttpException } from "@nestjs/common";
import { EStatus } from "../enums/EStatus";
export declare class CustomException extends HttpException {
    constructor(status: EStatus, message: string);
}
