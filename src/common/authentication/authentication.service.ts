import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { ConfigurationService } from '../configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as Auth0 from 'auth0-js';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthenticationService implements OnDestroy {
    private Auth0: Auth0.WebAuth = null;
    userProfile: Auth0.Auth0UserProfile;

    public onAuthenticatedHandler: EventEmitter<Auth0.Auth0UserProfile> = new EventEmitter();

    private routerEventListener: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private configurationService: ConfigurationService) {
        
     }

    private getAuth(callback: () => any) {
        if (this.Auth0 === null) {
            this.configurationService.getConfiguration('auth').subscribe((config: Auth0.AuthOptions) => {
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

    public handleAuthentication(): Observable<any> {
        return new Observable(observer => {
            this.getAuth(() => {
                this.Auth0.parseHash(null, (err, authResult) => {
                    if (authResult) {
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

                        observer.next();
                        this.router.navigate([returnUrl]);
                    } else if (err) {
                        observer.error(err);
                        this.router.navigate(['/']);
                    }
                });
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
