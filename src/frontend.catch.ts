import { NotFoundException, Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { resolve } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.sendFile(resolve('public/index.html'));
  }
}