import { Subscription } from 'rxjs/Subscription';
import { Injectable, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable()
export class RouterHelperService implements OnInit, OnDestroy {
  public onRouteChanged: EventEmitter<RouterEvent> = new EventEmitter();

  private activatedRouteListener: Subscription;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouteListener = this.router.events.subscribe(this.onRouterEvent);
  }

  private onRouterEvent(event: RouterEvent) {
    if (event instanceof NavigationEnd) {
      this.onRouterNavigationDone(event);
    }
  }

  private onRouterNavigationDone(event: NavigationEnd) {
    this.onRouteChanged.emit(event);
  }

  ngOnDestroy() {
    if (this.activatedRouteListener) {
      this.activatedRouteListener.unsubscribe();
    }
  }
}