import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ProtectMiddleware } from "../../middlewares/protect.middleware";

@Module({
  controllers: [],
  providers: [],
})
export class ComponentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectMiddleware).forRoutes(
      { path: "api/admin/store-components", method: RequestMethod.POST },
      {
        path: "api/admin/store-components/:idComponent",
        method: RequestMethod.DELETE,
      },
      {
        path: "api/admin/store-components/:idComponent",
        method: RequestMethod.PATCH,
      },
    );
  }
}
