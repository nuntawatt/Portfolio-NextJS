import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// สร้าง Filter สำหรับจัดการข้อผิดพลาดที่เกิดขึ้นใน HTTP Request
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // ตรวจสอบประเภทของ exceptionResponse เพื่อดึงข้อความและชื่อข้อผิดพลาด
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as Record<string, unknown>).message ||
          exception.message;

    const error =
      typeof exceptionResponse === 'string'
        ? exception.name
        : ((exceptionResponse as Record<string, unknown>).error as string) ||
          exception.name;

    const errorBody = {
      success: false as const,
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.warn(
      `[${request.method}] ${request.url} — ${statusCode} ${error}`,
    );

    response.status(statusCode).json(errorBody);
  }
}
