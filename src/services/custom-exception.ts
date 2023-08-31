import { HttpException, HttpStatus } from "@nestjs/common";
import { EStatus } from "../enums/EStatus";

export class CustomException extends HttpException {
  constructor(status: EStatus, message: string) {
    super(message, HttpStatus[status]);
  }
}
