import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

/** Interceptor to log incoming requests and outgoing responses with timing. */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;
    const startTime = Date.now();

    this.logger.log(`[${method}] ${url} - Incoming request`);

    return next.handle().pipe(
      tap({
        next: () => {
          const response = ctx.getResponse<Response>();
          const elapsed = Date.now() - startTime;
          this.logger.log(
            `[${method}] ${url} - ${response.statusCode} - ${elapsed}ms`,
          );
        },
        error: (error: Error & { status?: number }) => {
          const elapsed = Date.now() - startTime;
          const status = error.status ?? 500;
          this.logger.warn(
            `[${method}] ${url} - ${status} - ${elapsed}ms - ${error.message}`,
          );
        },
      }),
    );
  }
}
