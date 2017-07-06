import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/common/authentication';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'app/common/ui/animations';
import { Router } from '@angular/router';
import { CustomRoute } from 'app/common/router';
import { ClientService } from './clients/client.service';
import * as Auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    animations: [
        RouteTransitionAnimation
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    host: {
        '[class.flex-container-full]': 'true'
    }
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    userProfile: Auth0.Auth0UserProfile = null;
    routeItems: CustomRoute[] = [];

    private onUserAuthenticated: Subscription;

    constructor(private router: Router, private client: ClientService, private authService: AuthenticationService) { }

    ngOnInit() {
        if(this.authService.isAuthenticated()) {
            this.authService.getProfile().subscribe(profile => this.userProfile = profile);
        }

        this.onUserAuthenticated = this.authService.onAuthenticatedHandler.subscribe(profile => {
            this.userProfile = profile;
        });

        this.router.config.forEach((route: CustomRoute) => {
            if(route.mainNav && this.routeItems.indexOf(route) === -1)
                this.routeItems.push(route);
        });
    }

    ngAfterViewInit() {
        
    }

    ngOnDestroy() {
        this.onUserAuthenticated.unsubscribe();
    }
}