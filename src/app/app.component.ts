import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { AuthenticationService } from 'app/common/authentication';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'app/common/ui/animations';
import { Router } from '@angular/router';
import { CustomRoute } from 'app/common/router';
import * as Auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from 'app/app.store';
import * as userActions from 'app/common/users/store/users.actions';
import * as fromUsers from 'app/common/users/store/users.reducer';

@Component({
  selector: 'ccrm-root',
  animations: [
    RouteTransitionAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  auth0Profile: Auth0.Auth0UserProfile;

  userProfile: Auth0.Auth0UserProfile = null;
  routeItems: CustomRoute[] = [];

  @ViewChild('navMain') navigationBar: ElementRef;
  @ViewChild('actionBar') actionBar: ElementRef;

  layout = {
    navigation: {
      expanded: false
    },
    actionBar: {
      height: 0
    }
  };

  private onUserAuthenticated: Subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(profile => this.userProfile = profile);
    } else {
      this.authService.login();
    }

    this.store.select(fromRoot.fromUsers).select(fromUsers.auth0Profile)
      .subscribe(auth0Profile => this.auth0Profile = auth0Profile.profile);

    this.onUserAuthenticated = this.authService.onAuthenticatedHandler.subscribe(profile => {
      this.userProfile = profile;
    });

    this.router.config.forEach((route: CustomRoute) => {
      if (route.mainNav && this.routeItems.indexOf(route) === -1) {
        this.routeItems.push(route);
      }
    });
  }

  ngAfterViewInit() {
    
  }

  onNavigationToggle() {
    this.layout.navigation.expanded = !this.layout.navigation.expanded;
  }

  onNavigationItemClicked() {
    this.layout.navigation.expanded = false;
  }

  ngOnDestroy() {
    this.onUserAuthenticated.unsubscribe();
  }
}
