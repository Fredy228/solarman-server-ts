import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ProtectMiddleware } from "../../middlewares/protect.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectMiddleware).forRoutes(
      { path: "api/admin/register", method: RequestMethod.POST },
      { path: "api/admin/logout", method: RequestMethod.POST },
      { path: "api/admin/check-auth", method: RequestMethod.GET },
      { path: "api/admin/users", method: RequestMethod.GET },
      { path: "api/admin/delete/:id", method: RequestMethod.DELETE },
      {
        path: "api/admin/update-role/:userName",
        method: RequestMethod.PATCH,
      },
    );
  }
}
