import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { SlugifyService } from 'app/slugify.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Lead, LeadStatus, LeadChangedEvent } from './';
import { TimelineItem } from './view/timeline';

import { Settings } from 'app/constants';

@Injectable()
export class LeadsService {
    private apiHost = Settings.apiHost + '/leads';

    public onLeadLoad: EventEmitter<Lead> = new EventEmitter();
    private onLeadChanged: EventEmitter<LeadChangedEvent> = new EventEmitter();

    constructor(private http: Http) {}

    public addLeadChangedEventListener(lead: Lead, callback: (event: LeadChangedEvent) => any) {
        return this.onLeadChanged.subscribe((event: LeadChangedEvent) => {
            if(event.newLead._id == lead._id) {
                callback(event);
            }
        });
    }

    private _leadStatuses: Array<LeadStatus> = null;
    public getAllLeadStatuses(callback: (leadStatuses: Array<LeadStatus>) => any) {
        if(this._leadStatuses === null) {
            this.http
                .get(this.apiHost + '/status/all')
                .subscribe((res: Response) => {
                    let leadStatuses: Array<LeadStatus> = res.json() || null;

                    if(leadStatuses != null) {
                        this._leadStatuses = leadStatuses;
                        callback(this._leadStatuses);
                    }
                });
        }
        else
            callback(this._leadStatuses);

        return this;
    }

    private _leads: Array<Lead> = null;
    public getLeads(callback: (leads: Array<Lead>) => any) {
        if(this._leads === null) {
        return this.http
            .get(this.apiHost + '/all')
            .subscribe((res: Response) => {
                let leads: Array<Lead> = res.json() || null;
                this._leads = leads;

                if(this._leads != null)
                    callback(this._leads);
            });
        }
        else
            callback(this._leads);
    }

    private _lead: Lead = null;
    public getLead(id: string, callback?: (lead: Lead) => any) {
        if(this._lead === null) {
            this.http
                .get(this.apiHost + '/lead/' + id)
                .subscribe((res: Response) => {
                    let lead: Lead = res.json() || null;
                    this._lead = lead;

                    if(this._lead != null) {
                        this.onLeadLoad.emit(this._lead);
                    }
                });
        }
        else
            this.onLeadLoad.emit(this._lead);

        return this;
    }

    public setStatus(lead: Lead, status: LeadStatus) {
        let requestData = {
            'id': lead._id,
            'status': status._id
        };

        this.http.post(this.apiHost + '/lead/status/', requestData)
        .subscribe((res: Response) => {
            let resultData: { Success: boolean } = res.json();

            if(resultData.Success){
                var newLead: Lead = lead;
                    newLead.status = status;
                
                this.onLeadChanged.emit(new LeadChangedEvent(lead, newLead));
            }
        });
    }
}