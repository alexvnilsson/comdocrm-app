import { Injectable, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { ConfigurationService, Configuration } from 'app/configuration.service';
import 'rxjs/add/operator/filter';
import Auth0 from 'auth0-js';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {
  private Auth0: Auth0.WebAuth = null;
  userProfile: any;

  userScopes = [
    'openid',
    'profile'
  ]

  private routerEventListener: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private configurationService: ConfigurationService) { }

  private getAuth(callback: () => any) {
    if(this.Auth0 === null) {
      this.configurationService.getConfiguration((config: Configuration) => {        
          this.Auth0 = new Auth0.WebAuth(config);

        callback();
      });
    }
    else {
      callback();
    }
  }

   public login() {
    this.getAuth(() => {
      this.Auth0.authorize();
    });     
   }

   public handleAuthentication(): void {
     this.getAuth(() => {
        this.Auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';

            this.setSession(authResult);

            let returnAddress = localStorage.getItem('auth:returnAddress');

            if(returnAddress != null)
              this.router.navigate([returnAddress]);
            else
              this.router.navigate(['/']);
          } else if (err) {
            this.router.navigate(['/']);

            console.log(err);
          }
        });
     });
  }

  public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }

  const self = this;
  this.getAuth(() => {
    this.Auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  });
  }

  private setSession(authResult): void {
    const scopes = authResult.scope;
    console.log("scopes", scopes);

    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    let sessionScopes = localStorage.getItem('scopes');

    if(sessionScopes !== null && sessionScopes.length > 0) {
      console.log(sessionScopes);

      const grantedScopes = JSON.parse(sessionScopes).split(' ');
      return scopes.every(scope => grantedScopes.includes(scope));
    }
    else
      return false;
  }

  ngOnDestroy() {
    this.routerEventListener.unsubscribe();
  }
}
