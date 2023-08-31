"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config();
const main_module_1 = require("./main.module");
const http_exception_filter_1 = require("./app/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(main_module_1.MainModule, {
        logger: ["error", "warn", "log"],
        cors: true,
    });
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "static"));
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "build"));
    const PORT = process.env.NODE_ENV !== "production" ? 3001 : 5000;
    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map