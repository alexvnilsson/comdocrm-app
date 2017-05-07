import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NavbarItemDirective } from './navbar-item.directive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
class NavbarComponent implements OnInit, OnDestroy {
    @Input() items: Array<NavbarItemOptions> = [
        new NavbarItemOptions('marketing', '/marketing', 'Marketing', 'paper-plane-o'),
        new NavbarItemOptions('leads', '/leads', 'Leads', 'user-circle-o')
    ];

    @Input() section: string;

    @ViewChildren('navbarItem') navbarItems: QueryList<NavbarItemDirective>;

    private sectionChangedListener: Subscription;

    constructor() {}

    ngOnInit() {
        
    }

    ngOnDestroy() {
        this.sectionChangedListener.unsubscribe();
    }
}

class NavbarItemOptions {
    constructor(
        public section: string,
        public href: string,
        public title: string,
        public iconName: string
    ) {}
}

export {
    NavbarComponent,
    NavbarItemOptions
}