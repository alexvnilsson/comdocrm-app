import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild, ContentChild, Renderer, ViewChildren, ContentChildren, Output } from '@angular/core';

@Component({
    selector: 'state-container',
    template: `
        <ng-content *ngIf="enabled"></ng-content>
    `
})

export class StateContainerComponent implements OnInit {
    @ContentChild('ngContent') content: ContentChild;

    @Input() id: string = 'stateIdentifier';

    @Output() onEnabled: EventEmitter<boolean> = new EventEmitter();
    @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();

    enabled: boolean = false;
    @Input('state') set state(id:string) {
        if(this.id) {
            if(this.id == id){
                this.enabled = true;

                this.onEnabled.emit(true);
            }
            else {
                this.enabled = false;

                this.onDisabled.emit(true);
            }
        }
    }
    
    constructor(private renderer: Renderer, private elRef: ElementRef) { }

    ngOnInit() { }
}