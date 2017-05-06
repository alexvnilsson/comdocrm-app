import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from 'app/navigation.service';

import { NavbarItemDirective } from './navbar-item.directive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() items: Array<NavbarItemOptions> = [
        new NavbarItemOptions('marketing', '/marketing', 'Marketing', 'paper-plane-o'),
        new NavbarItemOptions('leads', '/leads', 'Leads', 'user-circle-o')
    ];

    @Input() section: string;

    @ViewChildren('navbarItem') navbarItems: QueryList<NavbarItemDirective>;

    private sectionChangedListener: Subscription;

    constructor(private navService: NavigationService) {}

    ngOnInit() {
        this.sectionChangedListener = this.navService.onSectionChanged.subscribe((section: string) => {
            this.setSectionToActive(section);
        });
    }

    private setSectionToActive(section: string) {
        let activeItem = this.navbarItems.find((item: NavbarItemDirective) => { return item.section == section });

        if(activeItem) {
            activeItem.active = true;
        }
    }

    ngAfterViewInit() {
        this.setSectionToActive(this.section);
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