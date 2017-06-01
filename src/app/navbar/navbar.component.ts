import { Component, Inject, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, UrlTree, RouterLinkActive } from '@angular/router';
import { Auth0UserProfile } from 'auth0-js';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { NavbarRouteConfig, NavbarItemRoute } from './navbar-route.config';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
    userProfile: Auth0UserProfile;
    @Input() items: Array<NavbarItemRoute> = [];

    private onAuthenticatedListener: Subscription;

    constructor(private router: Router, private authService: AuthService) {
        this.userProfile = null;
    }

    ngOnInit() {
        this.router.config.forEach((route: NavbarItemRoute) => {
            this.items.push(route);
        });

        if (this.authService.isAuthenticated()) {
            this.getUserProfile().then((profile: Auth0UserProfile) => {
                this.userProfile = profile;
            })
        }
        else
            this.onAuthenticatedListener = this.authService.onAuthenticatedHandler.subscribe(this.onUserAuthenticated.bind(this));
    }

    getUserProfile(): Promise<Auth0UserProfile> {
        return new Promise((resolve, reject) => {
            if (this.authService.isAuthenticated()) {
                this.authService.getProfile((error: any, profile: Auth0UserProfile) => {
                    if (!error && profile)                     
                        resolve(profile);
                    else
                        reject(error);
                });
            }
        })
    }

    onUserAuthenticated(profile?: Auth0UserProfile) {
        if (profile !== null) {
            this.userProfile = profile;
        }
        else {
            this.getUserProfile().then((profile: Auth0UserProfile) => {
                this.userProfile = profile;
            });
        }

        this.onAuthenticatedListener.unsubscribe();
    }

    public isParentActive(parentPath: string) {
        return this.router.isActive(parentPath, false);
    }

    onLinkClick(shouldCancel: boolean) {
        if (shouldCancel)
            return false;
    }

    ngOnDestroy() {
        this.onAuthenticatedListener.unsubscribe();
    }
}

export { NavbarRouteConfig, NavbarItemRoute }