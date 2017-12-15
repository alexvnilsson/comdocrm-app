import * as URL from "url";

import { environment } from 'environments';
import { AuthenticationService } from 'app/common/authentication/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import 'rxjs/add/observable/throw';

const SECURED_ENDPOINTS = [
  {
    type: "API",
    domain: "api.propublic.se"
  },
  {
    type: "IdAuthority",
    domain: environment.auth0.domain
  }
];

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqUrl = URL.parse(req.url),
      reqEndpoint = SECURED_ENDPOINTS.find(ep => ep.domain == reqUrl.host);

    if (environment.production || environment.staging) {
      if (!this.auth.isAuthenticated()) {
        if (SECURED_ENDPOINTS.find(ep => ep.domain == reqUrl.host)) {
          return Observable.throw(new Error('Client not authenticated to secure endpoint; aborting request.'));
        }
      }
    } else {
      console.warn(`ATTENTION! DEVELOPER MODE ENABLED, BYPASSING AUTHENTICATION!`);

      return next.handle(req);
    }

    switch(reqEndpoint.type) {
      case "IdAuthority":
        return next.handle(
          req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.auth.accessToken}`)
          })
        );

      case "API":
        return next.handle(
          req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.auth.idToken}`)
          })
        )

      default:
        return next.handle(req);
    }
  }

}
