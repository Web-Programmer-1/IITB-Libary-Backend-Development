import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';

const server = express();

async function createServer() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );

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

  await app.init();
}

let isInitialized = false;

export default async (req: any, res: any) => {
  if (!isInitialized) {
    await createServer();
    isInitialized = true;
  }
  server(req, res);
};
