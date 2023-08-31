import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
export declare class ReactApp implements NestMiddleware {
    use(_: Request, res: Response): void;
}
