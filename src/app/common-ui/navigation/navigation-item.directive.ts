import { Directive, Input } from '@angular/core';
import { CustomRoute } from 'app/common/router';

@Directive({
    selector: '[ccrmNavItem]',
    exportAs: 'ccrmNavItem',
    host: {
        '[class.nav-link]': 'true'
    }
})
export class NavigationItemDirective {
    @Input() route: CustomRoute;
}
