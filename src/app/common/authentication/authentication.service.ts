import { Store } from '@ngrx/store';
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

import * as fromRoot from 'app/app.store';
import * as userActions from 'app/common/users/store/users.actions';

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
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    if (this.isAuthenticated() === true) {
      this.getAuth0Profile();
    }
  }

  public isAuthenticating() {
    this._isAuthenticating = true;
  }

  public login() {
    if (this._isAuthenticating !== true) {
      this.Auth0.authorize(null);
    }
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
    return new Observable(observer => {
      this.Auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) {
          observer.error(err);
          this.router.navigate(['/']);
        } else {        
          this.setSession(authResult);

          let returnUrl: string = '/';

          if (sessionStorage.getItem('auth:returnUrl')) {
            returnUrl = sessionStorage.getItem('auth:returnUrl');
            sessionStorage.removeItem('auth:returnUrl');
          }

          setTimeout(() => {
            window.location.hash = '';
            this._isAuthenticating = false;

            this.getAuth0Profile();

            this.router.navigateByUrl(returnUrl);
            observer.complete();
          }, 1000);
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

  public getAuth0Profile() {
    this.store.dispatch(new userActions.MyAuth0ProfileAction());
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

    if (new Date().getTime() < expiresAt) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.routerEventListener.unsubscribe();
  }
}
