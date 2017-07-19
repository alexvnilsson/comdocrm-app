import { Component, Inject, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ActivatedRoute, Router, UrlTree, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    animations: [
        trigger('navbarTransition', [
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
    constructor(private router: Router) {}

    ngOnInit() {
        
    }

    onLinkClick(shouldCancel: boolean) {
        if (shouldCancel)
            return false;
    }

    ngOnDestroy() {
        
    }
}