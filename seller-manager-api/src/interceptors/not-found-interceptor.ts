import {CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException} from "@nestjs/common";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        console.info(error);
        throw new NotFoundException(error.message);
      }));
  }
}
