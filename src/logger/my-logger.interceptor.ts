import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLoggerService } from './logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: MyLoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const message = `[${request.url}], query: ${JSON.stringify(
          request.query,
        )}, body: ${JSON.stringify(request.body)}, code: ${
          response.statusCode
        } ${Date.now() - now}ms`;
        return this.logger.log(message);
      }),
    );
  }
}
