import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[ccrmUiTab]',
    exportAs: 'ccrmUiTab'
})
export class TabDirective {
    @Input() index: number;

    constructor() { }

    getIndex(): number {
        return this.index;
    }
}
