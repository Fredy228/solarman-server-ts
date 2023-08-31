import { IUser } from "../interfaces/IUser";

const jwt = require("jsonwebtoken");
import { CustomException } from "../services/custom-exception";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { getUserById } from "../controllers/user/userDB.service";
import { EStatus } from "../enums/EStatus";

@Injectable()
export class ProtectMiddleware implements NestMiddleware {
  async use(req: Request & { user?: IUser }, _: Response, next: NextFunction) {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new CustomException(EStatus.UNAUTHORIZED, "Not authorized");
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserById(decodedToken.id);

    if (!currentUser) {
      throw new CustomException(EStatus.UNAUTHORIZED, "Not authorized");
    }

    req.user = currentUser;

    next();
  }
}
