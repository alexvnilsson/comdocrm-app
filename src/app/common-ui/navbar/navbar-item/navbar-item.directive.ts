import { Directive } from '@angular/core';

@Directive({
  selector: '[navbarItem]',
  host: {
    '[class.page-navbar-item]': 'true',
    '[class.btn]': 'true',
    '[class.btn-outline-primary]': 'true',
    'role': 'button'
  }
})
export class NavbarItemDirective {

  constructor() { }

}
