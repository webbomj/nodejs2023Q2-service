import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { load } from 'js-yaml';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { MyLoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/my-exception.filter';
import { LoggingInterceptor } from './logger/my-logger.interceptor';

const PORT = process.env.PORT || 4200;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(MyLoggerService);
  app.useLogger(logger);

  process.on('uncaughtException', (error: Error) => {
    const message = `Caught Exception: ${error}`;
    logger.error(message);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    const message = `Handled Rejection: ${reason}`;
    logger.error(message);
  });

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const dockFilePath = path.join(__dirname, '../', '/doc', 'api.yaml');
  const doc = await fs.readFile(dockFilePath, 'utf8');

  SwaggerModule.setup('/doc', app, load(doc) as OpenAPIObject);

  await app.listen(PORT);
}
bootstrap();
