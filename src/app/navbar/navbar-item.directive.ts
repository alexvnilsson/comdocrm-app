import { Directive, Input, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Directive({
    selector: 'navbar-item',
    host: {
        '[class.active]': 'linkActive'
    }
})
export class NavbarItemDirective {
    
}