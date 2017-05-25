import { Directive } from '@angular/core';

@Directive({
  selector: '[appPageNavbarItem]',
  host: {
    '[class.page-navbar-item]': 'true',
    '[class.btn]': 'true',
    '[class.btn-outline-primary]': 'true',
    'role': 'button'
  }
})
export class PageNavbarItemDirective {

  constructor() { }

}
