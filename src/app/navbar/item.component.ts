import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'navbar-item',
    template: `<li class="nav-item"><a role="button" [routerLink]="href" [class.active]="active" class="nav-link d-flex flex-row justify-content-center align-items-center">
                    <fa [name]="iconName" size="2"></fa>
                    <h5 class="m-0 p-2"><ng-content></ng-content></h5>
                </a></li>`
})
export class NavbarItemComponent implements OnInit {
    @Input() active: boolean;
    @Input() iconName: string;
    @Input() href: string;
    @Input() section: string;

    ngOnInit() {

    }
}