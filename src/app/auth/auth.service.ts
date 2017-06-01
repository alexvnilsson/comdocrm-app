import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { ConfigurationService, Configuration } from 'app/configuration.service';
import 'rxjs/add/operator/filter';
import * as Auth0 from 'auth0-js';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {
    private Auth0: Auth0.WebAuth = null;
    userProfile: Auth0.Auth0UserProfile;

    public onAuthenticatedHandler: EventEmitter<Auth0.Auth0UserProfile> = new EventEmitter();

    private routerEventListener: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private configurationService: ConfigurationService) { }

    private getAuth(callback: () => any) {
        if (this.Auth0 === null) {
            this.configurationService.getConfiguration((config: Auth0.AuthOptions) => {
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
            this.Auth0.authorize(null);
        });
    }

    public handleAuthentication(): void {
        this.getAuth(() => {
            this.Auth0.parseHash(null, (err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';

                    this.setSession(authResult);

                    this.getProfile((error: any, profile: Auth0.Auth0UserProfile) => {
                        if (!error && profile)
                            this.onAuthenticatedHandler.next(profile);
                    });

                    let returnUrl: string = '/';

                    if(localStorage.getItem('auth:returnUrl').length > 0) {
                        returnUrl = localStorage.getItem('auth:returnUrl');
                        localStorage.removeItem('auth:returnUrl');
                    }

                    this.router.navigate([returnUrl]);
                } else if (err) {
                    this.router.navigate(['/']);

                    console.log(err);
                }
            });
        });
    }

    public getProfile(callback: (error: any, profile: Auth0.Auth0UserProfile) => any): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        this.getAuth(() => {
            this.Auth0.client.userInfo(accessToken, (error: any, profile: Auth0.Auth0UserProfile) => {
                if (profile) {
                    this.userProfile = profile;
                }
                callback(error, profile);
            });
        });
    }

    private setSession(authResult): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

        return new Date().getTime() < expiresAt;
    }

    ngOnDestroy() {
        this.routerEventListener.unsubscribe();
    }
}
