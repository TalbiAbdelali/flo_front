import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((error: any) => {
        // todo: log?

        if (error.status == 404) {
            alert(error.statusText);
        } else if (error.status == 403) {
            alert(error.statusText);
        } else if (error.status == 401) {
            alert(error.statusText);
        } else if (error.status == 400) {
            alert(error.statusText);
        }

        return throwError(error.statusText);
    }));
  }
}