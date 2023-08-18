import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('log');
    console.log(message);
    console.log(optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log('err');
    console.log(message);
    console.log(optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log('war');
    console.log(message);
    console.log(optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log('de');
    console.log(message);
    console.log(optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log('ver');
    console.log(message);
    console.log(optionalParams);
  }
}
