import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ProtectMiddleware } from "../../middlewares/protect.middleware";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectMiddleware).forRoutes(
      { path: "api/admin/portfolio", method: RequestMethod.POST },
      { path: "api/admin/portfolio/:idPost", method: RequestMethod.DELETE },
      {
        path: "api/admin/portfolio/image/:idPost",
        method: RequestMethod.DELETE,
      },
      { path: "api/admin/portfolio/:idPost", method: RequestMethod.PATCH },
      { path: "api/admin/portfolio/order", method: RequestMethod.PATCH },
    );
  }
}
