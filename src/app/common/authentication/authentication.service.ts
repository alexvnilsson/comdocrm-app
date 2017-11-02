import { Injectable, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '.env'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import * as Auth0 from 'auth0-js';

import { JwtHelper } from 'angular2-jwt';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthenticationService implements OnDestroy {
  private Auth0: Auth0.WebAuth = new Auth0.WebAuth({
    clientID: environment.auth0.clientId,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    audience: environment.auth0.audience,
    redirectUri: environment.auth0.redirectUrl,
    scope: 'openid profile'
  });
  userProfile: Auth0.Auth0UserProfile = null;
  _userProfiles: { [id: string]: Auth0.Auth0UserProfile } = {};

  public onAuthenticatedHandler: EventEmitter<Auth0.Auth0UserProfile> = new EventEmitter();

  onAuthhenticationTokenExpired = new EventEmitter();

  private routerEventListener: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    
  }

  public login() {
    //this.Auth0.authorize(null);
  }

  public getToken() {
    if (this.isAuthenticated() !== true) {
      return null;
    }

    return sessionStorage.getItem('id_token');
  }

  public handleAuthentication(): Observable<any> {
    return new Observable(observer => {
      this.Auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
        console.log(authResult, err);

        if (authResult) {
          window.location.hash = '';
          this.setSession(authResult);

          let returnUrl: string = '/';

          if (sessionStorage.getItem('auth:returnUrl').length > 0) {
            returnUrl = sessionStorage.getItem('auth:returnUrl');
            sessionStorage.removeItem('auth:returnUrl');
          }

          this.router.navigate([returnUrl]);

          observer.next();

        } else if (err) {
          observer.error(err);
          this.router.navigate(['/']);
        }
      });
    });
  }

  public getProfile(): Observable<Auth0.Auth0UserProfile> {
    return new Observable(observer => {
      const accessToken = sessionStorage.getItem('access_token');
      if (!accessToken)
        return observer.error('Could not fetch Auth0 UserProfile');

      if (this.userProfile !== null)
        return observer.next(this.userProfile);
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    sessionStorage.setItem('access_token', authResult.accessToken);
    sessionStorage.setItem('id_token', authResult.idToken);
    sessionStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));

    return new Date().getTime() < expiresAt;
  }

  ngOnDestroy() {
    this.routerEventListener.unsubscribe();
  }
}
