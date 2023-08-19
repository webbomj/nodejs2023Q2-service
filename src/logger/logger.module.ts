import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { HttpExceptionFilter } from './my-exception.filter';
import { LoggingInterceptor } from './my-logger.interceptor';

@Module({
  providers: [MyLoggerService, HttpExceptionFilter, LoggingInterceptor],
  exports: [MyLoggerService],
})
export class LoggerModule {}
