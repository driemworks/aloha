import { Observable, of } from 'rxjs';
    import { catchError } from 'rxjs/operators';
    import { Injectable } from '@angular/core';
    import {
      HttpInterceptor,
      HttpRequest,
      HttpHandler,
      HttpResponse,
      HttpEvent,
      HttpErrorResponse
    } from '@angular/common/http';

    @Injectable()
    export class EmptyResponseBodyErrorInterceptor implements HttpInterceptor {
        intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<any> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse, caught: Observable<any>) => {
                if (err.status === 401) {
                    console.log('hey you intercepted a 401 :' + JSON.stringify(err));
                    const res = new HttpResponse({
                        body: null,
                        headers: err.headers,
                        status: err.status,
                        statusText: err.statusText,
                        url: err.url
                      });
                      return of(res);
                }
                throw err;
            }
        ));
      }
    }