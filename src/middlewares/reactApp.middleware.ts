import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { join } from "path";

@Injectable()
export class ReactApp implements NestMiddleware {
  use(_: Request, res: Response) {
    res.sendFile(join(__dirname, "..", "..", "build", "index.html"));
  }
}
