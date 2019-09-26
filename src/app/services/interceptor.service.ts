import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private toast: ToastService,
    private userService: UserService,
    private util: UtilService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set("token", this.util.parameterTransfer(this.userService.user.info.token, '')) });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toast.show(error.error.message);
            break;
          case 500:
            this.toast.show('服务无响应，请稍后再试');
          default:
            break;
        }
        return throwError(error);
      }));

  }
}
