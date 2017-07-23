import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild, ContentChild, Renderer, ViewChildren, ContentChildren, Output, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { Subscription } from "rxjs/Subscription";

import { Store } from '@ngrx/store';
import * as fromRoot from 'app/app.store';

import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as layoutActions from 'app/common-ui/layout/layout.actions';

@Component({
    selector: 'modal-container',
    template: `<div class="modal fade" bsModal #modal="bs-modal" [config]="config" (onHidden)="onModalClosed($event)">
        <div [class]="'modal-dialog ' + modalClass" role="document">
            <div class="modal-content">
                <ng-container *ngIf="enabled">
                    <ng-content></ng-content>
                </ng-container>
            </div>
        </div>
    </div>
    `
})

export class ModalContainerComponent implements OnInit, OnDestroy {
    @ViewChild('modal') contentModal: ModalDirective;

    @Input() id: string = 'modalIdentifier';
    @Input() config: any = {};
    @Input('class') modalClass: string;

    @Output() onEnabled: EventEmitter<boolean> = new EventEmitter();
    @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();

    @Output() onClosed: EventEmitter<any> = new EventEmitter();

    enabled: boolean = false;
    @Input('state') set state(id: string) {
        if (this.id) {
            if (this.id == id) {
                this.enabled = true;

                if (this.contentModal && this.contentModal.config && !this.contentModal.isShown)
                    this.contentModal.show();
            }
            else {
                this.enabled = false;

                if (this.contentModal && this.contentModal.isShown)
                    this.contentModal.hide();
            }
        }
    }

    constructor(private renderer: Renderer, private elRef: ElementRef, private store$: Store<fromRoot.State>) { }

    private onDisabledSubscription: Subscription;
    ngOnInit() {
        this.config = Object.assign({}, this.config, {
            autoShow: false
        });

        this.onDisabledSubscription = this.onDisabled.subscribe(event => {
            if (this.contentModal && this.contentModal.isShown)
                this.contentModal.hide();
        });
    }

    private onModalClosed(event: Event) {
        this.store$.dispatch(new layoutActions.CloseModalAction());
    }

    ngOnDestroy() {
        if (this.onDisabledSubscription)
            this.onDisabledSubscription.unsubscribe();
    }
}