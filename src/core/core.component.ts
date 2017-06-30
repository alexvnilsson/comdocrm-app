import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'common/authentication';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'common/ui/animations';
import { Router } from '@angular/router';
import { CustomRoute } from 'common/router';
import { ClientService } from '../clients/client.service';
import * as Auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-core',
    animations: [
        RouteTransitionAnimation
    ],
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit, AfterViewInit, OnDestroy {
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