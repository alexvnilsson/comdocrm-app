import { Component, Inject, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ActivatedRoute, Router, UrlTree, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NavbarRouteConfig, NavbarItemRoute } from './navbar-route.config';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    animations: [
        trigger('navSubTransition', [
            state('void', style({
                opacity: '0',
                transform: 'translateY(-50%)'
            })),
            state('*',   style({
                opacity: '1.0',
                transform: 'translateY(0%)'
            })),
            transition('void => *', animate('200ms ease-in')),
            transition('* => void', animate('200ms ease-out'))
        ])
    ]
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() items: Array<NavbarItemRoute> = [];
    currentNavItem: NavbarItemRoute = null;

    private onRouterNavigatedListener: Subscription;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.config.forEach((route: NavbarItemRoute) => {
            this.items.push(route);
        });

        this.onRouterNavigatedListener = this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.onRouterNavigated(event);
            }
        });
    }

    public isParentActive(parentPath: string) {
        return this.router.isActive(parentPath, false);
    }

    onRouterNavigated(event: NavigationEnd) {
        this.items.forEach((item: NavbarItemRoute) => {
            if(item.href && event.url.startsWith(item.href))
                this.currentNavItem = item;
        })
    }

    onNavItemClicked(event: Event, item: NavbarItemRoute) {
        this.currentNavItem = item;
    }

    onLinkClick(shouldCancel: boolean) {
        if (shouldCancel)
            return false;
    }

    isNavItemShown(item: NavbarItemRoute): boolean {
        if(this.router.isActive(item.path, false) && this.currentNavItem == item)
            return true;

        if(this.currentNavItem == item)
            return true;

        return false;
    }

    ngOnDestroy() {
        this.onRouterNavigatedListener.unsubscribe();
    }
}

export { NavbarRouteConfig, NavbarItemRoute }