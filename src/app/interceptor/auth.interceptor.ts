import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      console.log('Intercepting request:', req);
    return this.auth.idTokenClaims$.pipe(
      switchMap((token) => {
        console.log('token', token?.__raw);
        // Clone the request to add the new header.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token?.__raw}`),
        });
        // Send the newly created request
        return next.handle(authReq);
      })
    );
  }
}
