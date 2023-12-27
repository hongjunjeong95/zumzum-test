import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.response.message || exception.response.error;

    this.logger.error(message);
    res.status(status).json({
      success: false,
      error: {
        statusCode: status,
        error: JSON.stringify(exception),
        message,
        timestamp: new Date().toISOString(),
        path: req.url,
      },
    });
  }
}
