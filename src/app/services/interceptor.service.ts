import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) { }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toast.show(error.error.message);
            break;
          default:
            this.toast.show('系统错误(' + error.status + ')，请稍后再试');
            break;
        }
        return throwError(error);
      }));

  }
}
