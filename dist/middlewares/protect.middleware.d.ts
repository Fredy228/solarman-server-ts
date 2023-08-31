import { IUser } from "../interfaces/IUser";
import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class ProtectMiddleware implements NestMiddleware {
    use(req: Request & {
        user?: IUser;
    }, _: Response, next: NextFunction): Promise<void>;
}
