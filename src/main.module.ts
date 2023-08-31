import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UserModule } from "./controllers/user/user.module";
import { ProtectMiddleware } from "./middlewares/protect.middleware";
import { ReactApp } from "./middlewares/reactApp.middleware";
import { PortfolioModule } from "./controllers/portfolio/portfolio.module";

@Module({
  imports: [UserModule, PortfolioModule],
  providers: [ProtectMiddleware],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReactApp).exclude("api/(.*)").forRoutes("*");
  }
}
