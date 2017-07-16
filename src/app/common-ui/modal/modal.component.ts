import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild, ContentChild, Renderer, ViewChildren, ContentChildren, Output, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'modal-container',
    template: `<div class="modal fade" bsModal #modal="bs-modal" config="{ autoShow: false }">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <ng-container *ngIf="enabled">
                    <ng-content
                        (onClosed)="onClosed.emit()">
                    </ng-content>
                </ng-container>
            </div>
        </div>
    </div>
    `
})

export class ModalContainerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('modal') contentModal: ModalDirective;

    @Input() id: string = 'modalIdentifier';

    @Output() onEnabled: EventEmitter<boolean> = new EventEmitter();
    @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();

    @Output() onClosed: EventEmitter<any> = new EventEmitter();

    enabled: boolean = false;
    @Input('state') set state(id:string) {
        if(this.id) {
            if(this.id == id){
                this.enabled = true;

                if(this.contentModal)
                    this.contentModal.show();
            }
            else {
                this.enabled = false;

                if(this.contentModal)
                    this.contentModal.hide();
            }
        }
    }
    
    constructor(private renderer: Renderer, private elRef: ElementRef) { }

    private onDisabledSubscription: Subscription;
    ngOnInit() {
        this.onDisabledSubscription = this.onDisabled.subscribe(event => {
            if(this.contentModal)
                this.contentModal.hide();
        });
     }

     private onModalHiddenSubscription: Subscription;
     ngAfterViewInit() {
         if(this.contentModal) {
            this.onModalHiddenSubscription = this.contentModal.onHidden.subscribe(event => {
                this.onClosed.emit();
            });    
         }
     }

     ngOnDestroy() {
         if(this.onDisabledSubscription)
            this.onDisabledSubscription.unsubscribe();

         if(this.onModalHiddenSubscription)
            this.onModalHiddenSubscription.unsubscribe();
     }
}