import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLoggerService } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(public logger: MyLoggerService) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? `[${request.url}], response: ${
            typeof exception.getResponse() === 'object'
              ? JSON.stringify(exception.getResponse())
              : exception.getResponse()
          } , status: ${status}`
        : `Internal Server Error, status: ${status}`;

    this.logger.error(message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
