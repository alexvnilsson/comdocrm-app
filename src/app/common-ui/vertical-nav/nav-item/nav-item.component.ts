import { VerticalNavigationItemOptions } from './options';
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
    selector: 'ccrm-vertical-nav-item',
    templateUrl: './vertical-nav-item.component.html',
    styleUrls: [
        './vertical-nav-item.component.scss'
    ],
    animations: [
        trigger('v-itemTransition', [
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
export class VerticalNavigationItemComponent {
    @Input() active = false;
    @Input() disabled = false;

    @Input() options: VerticalNavigationItemOptions;

    @Output() Activated: EventEmitter<any> = new EventEmitter();
    @Output() Deactivated: EventEmitter<any> = new EventEmitter();

    constructor(
        private elRef: ElementRef
    ) {}

    public activate() {
        if (this.active || this.disabled) {
            return false;
        }

        this.active = true;
        this.Activated.next(true);
    }

    public deactivate(bubble?: boolean) {
        if (!this.active) {
            return false;
        }

        this.active = false;

        if (bubble !== false) {
            this.Activated.next(true);
        }
    }

    public onItemClick(event: Event) {
        this.activate();
    }
}
