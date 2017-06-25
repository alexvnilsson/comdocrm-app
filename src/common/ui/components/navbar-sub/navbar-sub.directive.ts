import { Directive } from '@angular/core';

@Directive({
  selector: '[ccrmUiNavbarSubItem]',
  host: {
    '[class.page-navbar-item]': 'true',
    '[class.btn]': 'true',
    '[class.btn-outline-primary]': 'true',
    '[class.text-white]': 'true',
    'role': 'button'
  }
})
export class NavbarSubDirective {

  constructor() { }

}
