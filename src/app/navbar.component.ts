import { Component, Input } from '@angular/core';

@Component({
    selector: 'navbar-header',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Input() section: string;
}
