import { Directive } from '@angular/core';

@Directive({
    selector: '[ccrmNavigation]',
    exportAs: 'ccrmNavigation',
    host: {
        '[class.sidebar-nav]': 'true'
    }
})
export class NavigationDirective {

}