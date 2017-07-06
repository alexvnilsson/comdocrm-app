import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
    selector: 'ccrm-tabs-tab',
    template: `<div [@tabTransition] *ngIf="active">
        <ng-content></ng-content>
    </div>`,
    styles: [
        `
        `
    ],
    animations: [
        trigger('tabTransition', [
            state('void', style({ position: 'absolute', display: 'none', opacity: 0 })),
            transition(':enter', [
                animate('0.2s 210ms', keyframes([
                    style({ display: 'block', position: 'relative', opacity: '0', offset: 0 }),
                    style({ opacity: '1', offset: 1 })
                ]))
            ]),
            transition(':leave', [
                animate('0.2s', keyframes([
                    style({ opacity: '1', offset: 0 }),
                    style({ opacity: '0', offset: 1 })
                ]))
            ])
        ])
    ]
})
export class TabComponent {
    @Input('active') active: boolean = false;
    @Input('disabled') disabled: boolean = false;

    @Input('header') header: string = null;


    @Output() onTabActivated: EventEmitter<any> = new EventEmitter();
    @Output() onTabDeactivated: EventEmitter<any> = new EventEmitter();

    constructor(
        private elRef: ElementRef
    ) {
        
    }

    public activate() {
        if(this.disabled)
            return false;

        if(this.active)
            return false;

        this.active = true;
        this.onTabActivated.next(true);
    }

    public deactivate(bubble?: boolean) {
        if(!this.active)
            return false;

        this.active = false;

        if(bubble !== false)
            this.onTabDeactivated.next(true);
    }

    public onTabClick(event: Event) {
        this.activate();
    }
}
