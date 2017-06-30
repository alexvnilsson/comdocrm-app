import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'common/authentication';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'common/ui/animations';
import { Router } from '@angular/router';
import { CustomRoute } from 'common/router';

@Component({
    selector: 'ccrm-core',
    animations: [
        RouteTransitionAnimation
    ],
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit, AfterViewInit {
    items: CustomRoute[] = [];

    constructor(private router: Router, private authService: AuthenticationService) { }

    ngOnInit() {
        this.router.config.forEach((route: CustomRoute) => {
            this.items.push(route);
        });
    }

    ngAfterViewInit() {

    }
}