import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { HttpClientService } from 'app/http-client.service';
import { SlugifyService } from 'app/slugify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Lead, LeadStatus } from 'app/leads/lead';
import LeadStatusResult from 'app/leads/status/leadStatusResult';
import { TimelineItem } from 'app/leads/view/timeline/timeline';

@Injectable()
class LeadsService {
    private apiHost = 'http://localhost:3000';

    constructor(private httpClient: HttpClientService, private slugService: SlugifyService, private http: Http) {}

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

    public getLeads(): Observable<Array<Lead>> {
        return this.http
            .get(this.apiHost + '/leads')
            .map((res: Response) => {
                let text = res.json();

                return text || null;
            });
    }

    private _lead: Lead = null;
    public getLead(company: string, lead: string, id?: string, callback?: (lead: Lead) => any) {
        if(this._lead === null) {
            this.http
                .get(this.apiHost + '/leads/one/' + this.slugService.slugify(company) + '/' + this.slugService.slugify(lead))
                .subscribe((res: Response) => {
                    let lead: Lead = res.json() || null;
                    this._lead = lead;

                    if(this._lead != null)
                        callback(this._lead);
                });
        }
        else
            callback(this._lead);

        return this;
    }

    public setStatus(lead: Lead, status: LeadStatus, callback?: (lead: LeadStatus) => any) {
        let requestData = new URLSearchParams();
        requestData.append('lead', lead._id.toString())
        requestData.append('status', status._id.toString());

        this.http.post(this.apiHost + '/leads/status', requestData)
        .subscribe((res: Response) => {
            let leadStatusResult: LeadStatus = res.json();

            if(leadStatusResult) {
                lead.status = leadStatusResult;

                if(callback)
                    callback(lead.status);
            }
        })
    }
}

export { LeadsService, Lead }