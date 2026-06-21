"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
let cachedServer;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('IITB Library Backend')
        .setDescription('Library management system API starter')
        .setVersion('0.1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document);
    if (process.env.VERCEL) {
        await app.init();
        return app.getHttpAdapter().getInstance();
    }
    await app.listen(process.env.PORT || 5000);
}
let handler;
if (process.env.VERCEL) {
    handler = async (req, res) => {
        if (!cachedServer) {
            cachedServer = await bootstrap();
        }
        return cachedServer(req, res);
    };
}
else {
    bootstrap();
}
exports.default = handler;
//# sourceMappingURL=main.js.map