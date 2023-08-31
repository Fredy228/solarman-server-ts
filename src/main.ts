import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

import { MainModule } from "./main.module";
import { HttpExceptionFilter } from "./app/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    logger: ["error", "warn", "log"],
    cors: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, "..", "static"));
  app.useStaticAssets(join(__dirname, "..", "build"));

  const PORT = process.env.NODE_ENV !== "production" ? 3001 : 5000;

  await app.listen(PORT, (): void => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
