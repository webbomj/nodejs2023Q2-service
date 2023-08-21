import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('\x1b[32m%s\x1b[0m', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log('\x1b[31m%s\x1b[0m', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log('\x1b[33m%s\x1b[0m', message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[34m%s\x1b[0m', message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m%s\x1b[0m', message, optionalParams);
  }
}
