import { Injectable } from '@angular/core';
import { AuthHttpExtended } from '../../common/authentication/auth-http-extended';
import { Response } from '@angular/http';
import { PlannerContainer } from './models/plannerContainer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarketingService {
    private apiBaseAddr: string = '/marketing';

    constructor(
        private http: AuthHttpExtended
    ) {}

    public getPlannerContainers(): Observable<Array<PlannerContainer>> {
        return new Observable(observer => {
            this.http.get(`${this.apiBaseAddr}/planning`)
                .map(res => res.json() as Array<PlannerContainer>)
                .subscribe(
                    items => {
                        observer.next(items);
                    }, 
                    error => {
                        observer.error(error);
                    }
                );
        });
    }
}