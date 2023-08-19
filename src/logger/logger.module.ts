import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { HttpExceptionFilter } from './my-exception.filter';

@Module({
  providers: [MyLoggerService, HttpExceptionFilter],
  exports: [MyLoggerService],
})
export class LoggerModule {}
