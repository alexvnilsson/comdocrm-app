import { Directive, Input } from '@angular/core';
import { CustomRoute } from 'common/router';

@Directive({
    selector: '[ccrmNavItem]',
    exportAs: 'ccrmNavItem',
    host: {
        '[class.text-white]': 'true'
    }
})
export class NavigationItemDirective {
    @Input() route: CustomRoute;
}
