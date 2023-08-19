import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: MyLoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getRequest();

    // console.log(request);
    console.log(response);

    return next.handle().pipe(
      tap(() => {
        const message = `[${request.url}], query: ${JSON.stringify(
          request.query,
        )}, body: ${JSON.stringify(request.body)}, code: ${
          response.res.statusCode
        } ${Date.now() - now}ms`;
        return this.logger.log(message);
      }),
    );
  }
}
