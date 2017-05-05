import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import Lead from 'app/leads/lead';
import LeadStatus from 'app/leads/status/leadStatus';
import LeadStatusResult from 'app/leads/status/leadStatusResult';

@Injectable()
class LeadsService {
    private serviceBaseAddr = 'http://localhost:3000';

    constructor(private http: Http) {
        
    }

    public getLeadStatusTable(): Observable<Array<LeadStatus>> {
        return this.http
            .get(this.serviceBaseAddr + '/leads/status/table')
            .map((res: Response) => {
                let text = res.json();

                return text || null;
            });
    }

    public getLeads(): Observable<Array<Lead>> {
        return this.http
            .get(this.serviceBaseAddr + '/leads')
            .map((res: Response) => {
                let text = res.json();

                return text || null;
            });
    }

    public getLead(id: string): Observable<Lead> {
        return this.http
            .get(this.serviceBaseAddr + '/leads/one/' + id)
            .map((res: Response) => {
                let text = res.json();

                return text || null;
            });
    }

    public setStatus(lead: Lead, statusId: number) {
        let reqHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let reqOptions = new RequestOptions({ headers: reqHeaders });

        let requestData = new URLSearchParams();
        requestData.append('lead', lead._id.toString())
        requestData.append('status', statusId.toString());

        this.http.post(this.serviceBaseAddr + '/leads/status', requestData, reqOptions)
        .subscribe((res: Response) => {
            let leadStatusResult: LeadStatus = res.json();

            if(leadStatusResult) {
                lead.status = leadStatusResult;
            }
        })
    }
}

export { LeadsService, Lead }