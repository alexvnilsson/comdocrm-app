import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import Lead from 'app/leads/lead';

@Injectable()
class LeadsService {
    private serviceBaseAddr = 'http://localhost:3000';

    constructor(private http: Http) {}

    public getLeads(): Observable<Array<Lead>> {
        return this.http
            .get(this.serviceBaseAddr + '/leads')
            .map((res: Response) => {
                let text = res.json();

                return text || null;
            });
    }
}

export { LeadsService, Lead }