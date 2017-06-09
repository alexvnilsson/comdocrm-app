import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appTabsTab]',
    exportAs: 'appTabsTab'
})
export class TabsTabDirective {
    @Input() index: number;

    constructor() { }

    getIndex(): number {
        return this.index;
    }
}
