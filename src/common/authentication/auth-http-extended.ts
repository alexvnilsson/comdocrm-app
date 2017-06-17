import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/mergeMap";

export class AuthHttpExtended extends AuthHttp {
    private webApiHost: string = null;

/**
 * Constructs the AuthHttpExtended-class, resolves dependencies and constructs base-class AuthHttp.
 * 
 * @param http Http-service 
 * @param options HTTP request options
 * @param configService Configuration service
 */
    constructor(http: Http, options: RequestOptions, private configService: ConfigurationService) {
        super(
            new AuthConfig({
                tokenGetter: (() => {
                    return localStorage.getItem('id_token')
                })
            }), http, options
        );
    }    

/**
 * Overrides get() method of parent, injects the hostname of the WebAPI into the requested path and performs the GET-request.
 * @see getBaseUrl()
 * 
 * @param url resource path
 * @param options optional request options
 */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable(observer => {
            this.getHost().subscribe(host => {
                super.get(host + url, options).subscribe((res: Response) => {
                    observer.next(res);
                });
            });
        });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable(observer => {
            this.getHost().subscribe(host => {
                super.post(host + url, body, options).subscribe((res: Response) => {
                    observer.next(res);
                });
            })
        });
    }

    // Private helpers

    /**
     * Returns the hostname of the back-end WebAPI.
     */
    private getHost(): Observable<string> {
        return new Observable(observer => {
            if(this.webApiHost == null) {
                this.configService.getConfiguration('api').subscribe((config) => {
                    if(config && config.server && config.server.serverUrl)
                        observer.next(this.webApiHost = config.server.serverUrl);
                });
            }
            else
                observer.next(this.webApiHost);
        })
    }
}

export function authHttpExtendedFactory(http: Http, options: RequestOptions, configService: ConfigurationService) {    
    return new AuthHttpExtended(
        http, options, configService);
}