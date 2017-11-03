import { environment } from '.env';
import { AuthenticationService } from 'app/common/authentication';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import 'rxjs/add/observable/throw';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  
  constructor(
    private auth: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      if (req.url.indexOf(environment.auth0.domain) !== -1) {
        // HTTP Request to Auth0 Authentication API.
        const token = this.auth.accessToken;

        if (token) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });

          return next.handle(authReq);
        }

      } else {
        // HTTP Request to first-party API.

        const token = this.auth.idToken;

        if (token) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });

          return next.handle(authReq);
        }
      }
    }

    return Observable.throw(new Error('Client not authenticated, canceling.'));  
  }

}