import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private logger = new Logger(RequestLoggingInterceptor.name, {
    timestamp: true,
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;
    const authorization = (headers.authorization ?? '').length > 1;
    this.logger.log(
      `[${method}] authenticated:${authorization} =>${url} \nbody: ${JSON.stringify(
        body,
      )}`,
    );
    return next.handle();
  }
}
