import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

let cachedServer: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('IITB Library Backend')
    .setDescription('Library management system API starter')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  if (process.env.VERCEL) {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }

  await app.listen(process.env.PORT || 5000);
}

// For Vercel Serverless environment, export the handler
let handler: any;
if (process.env.VERCEL) {
  handler = async (req: any, res: any) => {
    if (!cachedServer) {
      cachedServer = await bootstrap();
    }
    return cachedServer(req, res);
  };
} else {
  bootstrap();
}

export default handler;
