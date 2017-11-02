import { AuthenticationService } from 'app/common/authentication';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  
  constructor(
    private auth: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});

    return next.handle(authReq);
  }

}