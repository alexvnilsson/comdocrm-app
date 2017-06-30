import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'ui-loading',
    template: `
        <ccrm-ui-spinner *ngIf="isLoading" (done)="onDoneLoading($event)"></ccrm-ui-spinner>

        <ng-container *ngIf="isDoneLoading">
            <ng-content></ng-content>
        </ng-container>
    `
})
export class LoadingComponent {
    @Input('loading') isLoading: boolean; 

    isDoneLoading: boolean = false;

    @Output('done') onStateChanged = new EventEmitter<boolean>();

    onDoneLoading(event: Event) {
        this.isDoneLoading = true;
        this.onStateChanged.emit(true);
    }
}
