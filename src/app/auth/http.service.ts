import { Injectable, OnInit } from '@angular/core';
import { Http, BaseRequestOptions, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ConfigurationService } from 'app/configuration.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/mergeMap";

export class AuthHttpExtended extends AuthHttp implements OnInit {
    private webApiBaseUrl: string = null;

    constructor(http: Http, options: RequestOptions, private configService: ConfigurationService) {
        super(
            new AuthConfig({
                tokenGetter: (() => {
                    return localStorage.getItem('id_token')
                })
            }), http, options
        );

        
    }

    ngOnInit() {
        this.configService.getConfiguration('api', (config) => {
            if(config && config.server && config.server.serverUrl)
                this.webApiBaseUrl = config.server.serverUrl;
        });
    }

    private getBaseUrl(): Observable<string> {
        let subject = new Subject();
        
        if(this.webApiBaseUrl === null) {
            this.configService.getConfiguration('api', (config) => {
                if(config && config.server && config.server.serverUrl)
                    this.webApiBaseUrl = config.server.serverUrl;

                    subject.next(this.webApiBaseUrl);
                    subject.complete();
            });
        }
        else {
            subject.next(this.webApiBaseUrl);
            subject.complete();
        }

        return subject.asObservable();
    }

    get(url: string, options?: RequestOptionsArgs): any {
        let requestSubject = new Subject();

        this.getBaseUrl().subscribe((baseUrl) => {
            super.get(baseUrl + url, options).subscribe((res: Response) => {
                requestSubject.next(res);
                requestSubject.complete();
            });
        });

        return requestSubject.asObservable();
    }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions, configService: ConfigurationService) {    
    return new AuthHttpExtended(
        http, options, configService);
}