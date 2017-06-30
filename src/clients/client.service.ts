import { Injectable, OnInit } from '@angular/core';
import { AuthHttpExtended } from '../common/authentication/auth-http-extended';
import { ClientInformation } from './client';
import { Observable } from 'rxjs/Observable';

export function ClientServiceInitFactory(clientService: ClientService): Function {
    return () => clientService.load();
}

@Injectable()
export class ClientService {
    private apiBaseAddr: string = '/api/client';

    private _clientInformation: ClientInformation = null;

    constructor(
        private http: AuthHttpExtended
    ) {
        
    }

    load(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getClientInformation().subscribe(result => resolve(true), error => resolve(false));
        });
    }

    private getClientInformation(): Observable<any> {
        return new Observable(observer => {
            this.http.get(`${this.apiBaseAddr}`)
                .map(response => response.json() as ClientInformation || null)
                .subscribe(client => {
                    this._clientInformation = client;

                    observer.next(true);
                },
                error => {
                    observer.error();
                });
        });
    }

    get clientInformation(): ClientInformation {
        if(this._clientInformation !== null)
            return this._clientInformation;

        return null;
    }
}