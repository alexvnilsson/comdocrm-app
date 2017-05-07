import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { HttpClientService } from 'app/http-client.service';
import { SlugifyService } from 'app/slugify.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Lead, LeadStatus, LeadChangedEvent } from 'app/leads/lead';
import { TimelineItem } from 'app/leads/view/timeline/timeline';

@Injectable()
export class LeadsService {
    private apiHost = 'http://localhost:3000';

    public onLeadLoad: EventEmitter<Lead> = new EventEmitter();
    private onLeadChanged: EventEmitter<LeadChangedEvent> = new EventEmitter();

    constructor(private httpClient: HttpClientService, private slugService: SlugifyService, private http: Http) {}

    public addLeadChangedEventListener(lead: Lead, callback: (event: LeadChangedEvent) => any) {
        this.onLeadChanged.subscribe((event: LeadChangedEvent) => {
            if(event.company == lead.company.slug && event.lead == lead.slug) {
                callback(event);
            }
        });

        return this;
    }

    private _leadStatuses: Array<LeadStatus> = null;
    public getLeadStatusTable(callback: (leadStatuses: Array<LeadStatus>) => any) {
        if(this._leadStatuses === null) {
            this.http
                .get(this.apiHost + '/leads/status/table')
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
            .get(this.apiHost + '/leads')
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
    public getLead(company: string, lead: string, id?: string, callback?: (lead: Lead) => any) {
        if(this._lead === null) {
            this.http
                .get(this.apiHost + '/leads/one/' + this.slugService.slugify(company) + '/' + this.slugService.slugify(lead))
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

    public setStatus(company: string, lead: string, status: LeadStatus) {
        let requestData = new URLSearchParams();
        requestData.append('company', this.slugService.slugify(company));
        requestData.append('lead',  this.slugService.slugify(lead));
        requestData.append('status', status.name);

        this.http.post(this.apiHost + '/leads/status/', requestData)
        .subscribe((res: Response) => {
            let newStatus: LeadStatus = res.json();

            if(newStatus)
                this.onLeadChanged.emit(new LeadChangedEvent(company, lead, newStatus));
        });
    }
}

export { Lead }