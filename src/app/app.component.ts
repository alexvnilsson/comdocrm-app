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
import { ClientService } from './clients/client.service';
import * as Auth0 from 'auth0-js';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ccrm-root',
  animations: [
    RouteTransitionAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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

  onNavigationItemClicked$: EventEmitter<any> = new EventEmitter();

  private onUserAuthenticated: Subscription;

  constructor(private router: Router, private client: ClientService, private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(profile => this.userProfile = profile);
    } else {
      this.authService.login();
    }

    this.onUserAuthenticated = this.authService.onAuthenticatedHandler.subscribe(profile => {
      this.userProfile = profile;
    });

    this.router.config.forEach((route: CustomRoute) => {
      if (route.mainNav && this.routeItems.indexOf(route) === -1) {
        this.routeItems.push(route);
      }
    });

    this.onNavigationItemClicked$.delay(250).subscribe(() => {
      this.onNavigationItemClicked();
    });
  }

  ngAfterViewInit() {
    
  }

  onNavigationToggle() {
    this.layout.navigation.expanded = !this.layout.navigation.expanded;
  }

  onNavigationItemClicked() {
    if (this.navigationBar.nativeElement.classList.contains('show')) {
      this.navigationBar.nativeElement.classList.remove('show');
    }
  }

  ngOnDestroy() {
    this.onUserAuthenticated.unsubscribe();
  }
}
