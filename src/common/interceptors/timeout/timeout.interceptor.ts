import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, timeout, TimeoutError } from "rxjs";
import { throwError } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // updated usage of throwError to use a factory function (old usage of throwError is deprecated)
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
