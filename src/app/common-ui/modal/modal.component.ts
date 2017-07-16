import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap';

@Component({
    selector: 'modal-container',
    template: `
    <div class="modal fade" bsModal #modal="bs-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
    </div>`
})
export class ModalComponent implements OnInit, AfterViewInit {
    @Input() name: string = 'modalContainer';
    @ViewChild('modal') modalRef: ModalDirective;

    @Input() set state(_state: any) {
        if (_state == this.name && this.modalRef)
            this.open();
        else if (this.modalRef)
            this.close();
    }

    @Output() onClose = new EventEmitter<any>();

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.modalRef.config = {
            backdrop: 'static'
        };

        this.modalRef.onShown.subscribe(() => {

        });

        this.modalRef.onHidden.subscribe(() => {

        });
    }

    public open() {
        this.modalRef.show();
    }

    public close() {
        this.modalRef.hide();
    }
}