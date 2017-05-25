import { Component, Inject, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, UrlTree, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NavbarRouteConfig, NavbarItemRoute } from './navbar-route.config';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    @Input() items: Array<NavbarItemRoute> = [];

    constructor(private router: Router) {
        
    }

    ngOnInit() {
        this.router.config.forEach((route: NavbarItemRoute) => {
            this.items.push(route);
        });
    }

    public isParentActive(parentPath: string) {
      return this.router.isActive(parentPath, false);
    }

    onLinkClick(shouldCancel: boolean) {
      if(shouldCancel)
        return false;
    }
}

export { NavbarRouteConfig, NavbarItemRoute }