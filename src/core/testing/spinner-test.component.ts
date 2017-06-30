import { Component } from '@angular/core';

@Component({
    selector: 'ccrm-testing-spinner',
    template: `
    <div class="container">
    <ccrm-ui-spinner #spinner *ngIf="show"></ccrm-ui-spinner>
    </div>

    <div class="container mt-5">
        <button (click)="clickShow()">Show</button> <button (click)="clickHide()">Hide</button>
    </div>

    <div class="container mt-2">
        {{ spinner?.state?.name }}
    </div>
    `
})
export class TestSpinnerComponent {
    show: boolean;

    clickShow() {
        this.show = true;
    }

    clickHide() {
        this.show = false;
    }
}