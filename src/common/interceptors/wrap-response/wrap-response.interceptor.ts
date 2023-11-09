import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from "rxjs";

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Now interceptor is running before the handler...');

    // wraps the response in a data property
    return next.handle().pipe(map((data) => ({data})));
  }
}
