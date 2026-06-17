import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

// Maps Prisma error codes to HTTP statuses and messages.
const PRISMA_ERROR_MAP: Record<
  string,
  { status: HttpStatus; message: string }
> = {
  // Unique constraint
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'A record with this value already exists',
  },
  // Record not found
  P2025: {
    status: HttpStatus.NOT_FOUND,
    message: 'The requested record was not found',
  },
  // Foreign key failure
  P2003: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Related record not found (foreign key constraint failed)',
  },
};

//  Global filter to catch Prisma errors and return structured errors.
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const errorInfo = PRISMA_ERROR_MAP[exception.code];

    const statusCode = errorInfo?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = errorInfo
      ? this.buildDetailedMessage(exception, errorInfo.message)
      : 'An unexpected database error occurred';
    const error = errorInfo ? HttpStatus[statusCode] : 'Internal Server Error';

    const errorBody = {
      success: false as const,
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.warn(
      `Prisma error ${exception.code}: ${message} — [${request.method}] ${request.url}`,
    );

    response.status(statusCode).json(errorBody);
  }

  // Builds a detailed error message with field details.
  private buildDetailedMessage(
    exception: Prisma.PrismaClientKnownRequestError,
    baseMessage: string,
  ): string {
    const meta = exception.meta;

    // Unique constraint fields
    if (exception.code === 'P2002' && meta?.target) {
      const target = meta.target;
      const fields = Array.isArray(target)
        ? target.map((t) => String(t)).join(', ')
        : typeof target === 'string'
          ? target
          : JSON.stringify(target);
      return `${baseMessage}: [${fields}]`;
    }

    // Not found cause
    if (exception.code === 'P2025' && meta?.cause) {
      const cause = meta.cause;
      const causeStr =
        typeof cause === 'string' ? cause : JSON.stringify(cause);
      return `${baseMessage}: ${causeStr}`;
    }

    return baseMessage;
  }
}
