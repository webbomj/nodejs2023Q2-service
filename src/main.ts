import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { load } from 'js-yaml';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const PORT = process.env.PORT || 4200;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const dockFilePath = path.join(__dirname, '../', '/doc', 'api.yaml');
  const doc = await fs.readFile(dockFilePath, 'utf8');

  SwaggerModule.setup('/doc', app, load(doc) as OpenAPIObject);

  await app.listen(PORT);
}
bootstrap();
