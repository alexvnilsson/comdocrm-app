import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'navbar-mobile-item',
    template: `<li class="nav-item">
                    <a [href]="href" [class.active]="active" class="nav-link d-flex flex-row justify-content-center">
                        <fa [name]="iconName" size="2"></fa>
                    </a>
                </li>`
})
export class NavbarMobileItemComponent implements OnInit {
    @Input() active: boolean;
    @Input() iconName: string;
    @Input() href: string;
    @Input() section: string;

    ngOnInit() {

    }
}