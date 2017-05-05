import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';

import LeadStatus from 'app/leads/status/leadStatus';
import LeadStatusPendingChange from 'app/leads/status/leadStatusPendingChange';

@Component({
    selector: 'leads-status-form',
    template: `<div class="card card-block" [hidden]="!statusPending?.waiting"><form class="form-inline" (onOpened)="statusTitle.focus()">
        <div class="form-control mb-2 mr-sm-2 mb-sm-0 p-3 badge badge-default"
        [style.background]="status?.style?.bgColor" [style.border-color]="status?.style?.bgColor" [style.color]="status?.style?.color">
            {{ status?.text }}
        </div>

        <fa class="ml-2 mr-2" name="chevron-right"></fa>

        <label class="sr-only" for="statusTitleInput">Description</label>
        <input #statusTitle type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="statusTitleInput" placeholder="Describe it!">

        <label class="sr-only" for="inlineFormInputGroup">Username</label>
        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
            <div class="input-group-addon">@</div>
            <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username">
        </div>

        <div class="form-check mb-2 mr-sm-2 mb-sm-0">
            <label class="form-check-label">
            <input class="form-check-input" type="checkbox"> Remember me
            </label>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        </form></div>`
})
export class StatusFormComponent {
    //@HostBinding('class.d-none') isHidden: boolean = true;

    @ViewChild('statusTitle')
    private _statusTitle: ElementRef;

    @Output() onOpened = new EventEmitter();

    @Input() statusPending: LeadStatusPendingChange;
    @Input() status: LeadStatus;

    public onStatusPendingChange(statusPending: LeadStatusPendingChange) {
        this.statusPending = statusPending;
        this.status = this.statusPending.newStatus;

        //this.isHidden = !this.statusPending.waiting;

        this._onOpened();
    }

    private _onOpened() {
        this._statusTitle.nativeElement.focus();
    }
}