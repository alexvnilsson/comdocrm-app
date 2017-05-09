import { Component, Inject, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NavbarItemRoute } from './navbar-item.route';

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
            if(route.mainNav === true)
                this.items.push(route);
        });
    }
}