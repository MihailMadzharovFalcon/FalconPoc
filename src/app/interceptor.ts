import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloackService } from './keycloack.service';
import { JsonpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public keycloackService: KeycloackService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // update token if there is less then 10 seconds left before it expires.
    return from(this.keycloackService.updateToken(30)).pipe(
      switchMap(() => {
        const headers = {
          Authorization: `Bearer ${this.keycloackService.token}`
        };
        request = request.clone({ setHeaders: headers });
        return next.handle(request);
      })
    );
  }
}
