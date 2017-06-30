import { Directive } from '@angular/core';

@Directive({
    selector: '[ccrmNavigation]',
    exportAs: 'ccrmNavigation',
    host: {
        '[class.d-flex]': 'true',
        '[class.flex-column]': 'true',
        '[class.justify-content-start]': 'true',
        '[class.align-items-center]': 'true',
        '[class.bg-inverse]': 'true',
        '[class.vh-100]': 'true',
        '[class.pt-2]': 'true',
        '[style.flex]': '"4"',
        '[style.min-width]': '"2.5rem"',
        '[style.max-width]': '"2.51rem"'
    }
})
export class NavigationDirective {

}