import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseException } from './server-exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(BaseException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  async catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    return this.handleCustomException(response, exception);
  }

  private async handleCustomException(
    response: any,
    exception: {
      code: number;
      message: string;
    },
  ) {
    const { code, message } = exception;
    this.logger.error({
      statusCode: code,
      message,
    });

    return response.status(code).json({ code, message });
  }
}
