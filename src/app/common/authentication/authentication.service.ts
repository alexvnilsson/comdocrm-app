import { Injectable, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '.env'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import * as Auth0 from 'auth0-js';

import { JwtHelper } from 'angular2-jwt';

import { Subscription } from 'rxjs/Subscription';

const AUTH_TIME_DELAY: number = 2500;

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

  protected _isAuthenticating: boolean;

  private routerEventListener: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  public isAuthenticating(state: boolean) {
    this._isAuthenticating = state;
  }

  public login() {
    setTimeout(() => {
      if (!this._isAuthenticating) {
        this.Auth0.authorize(null);
      }
    }, AUTH_TIME_DELAY);
  }

  public get idToken() {
    if (!this.isAuthenticated()) {
      return null;
    }

    if (!sessionStorage.getItem('id_token')) {
      return null;
    }

    return sessionStorage.getItem('id_token');
  }

  public get accessToken() {
    if (!this.isAuthenticated()) {
      return null;
    }

    if (!sessionStorage.getItem('access_token')) {
      return null;
    }

    return sessionStorage.getItem('access_token');
  }

  public handleAuthentication(): Observable<any> {
    let returnUrl = '/';

    return new Observable(observer => {
      this.Auth0.parseHash({ hash: window.location.hash }, (err, result) => {
        if (err || !result) {
          observer.error(err);
          this.router.navigateByUrl(returnUrl);
        } else {        
          this.setSession(result);

          setTimeout(() => {
            window.location.hash = '';

            window.location.reload();
            observer.next();
          }, AUTH_TIME_DELAY);
        }
      });
    });
  }

  public handleAuthenticationPost() {
    let returnUrl = '/';
    
    if (sessionStorage.getItem('auth:returnUrl')) {
      returnUrl = sessionStorage.getItem('auth:returnUrl');
      sessionStorage.removeItem('auth:returnUrl');
    }

    this.isAuthenticating(false);

    setTimeout(() => {
      this.router.navigateByUrl(returnUrl);
    }, AUTH_TIME_DELAY);
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

  public getAuth0Profile() {
    throw new Error('Not implemented.');
  }

  private setSession(result): void {
    const expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());

    sessionStorage.setItem('access_token', result.accessToken);
    sessionStorage.setItem('id_token', result.idToken);
    sessionStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');

    setTimeout(() => {
      window.location.reload();
    }, AUTH_TIME_DELAY);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));

    if (new Date().getTime() < expiresAt) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.routerEventListener.unsubscribe();
  }
}
