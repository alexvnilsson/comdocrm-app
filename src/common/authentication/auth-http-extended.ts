import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { envOptions } from '.environments/options';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/mergeMap";

export class AuthHttpExtended extends AuthHttp {
    private webApiHost: string = envOptions.api.endpoint;

/**
 * Constructs the AuthHttpExtended-class, resolves dependencies and constructs base-class AuthHttp.
 * 
 * @param http Http-service 
 * @param options HTTP request options
 * @param configService Configuration service
 */
    constructor(http: Http, options: RequestOptions) {
        super(
            new AuthConfig({
                tokenGetter: (() => {
                    return localStorage.getItem('id_token')
                })
            }), http, options
        );
    }

    get(url: string, options?: RequestOptionsArgs, omitHost?: boolean): Observable<Response> {
        return new Observable(observer => {
            let completeUrl: string = url;

            if(!omitHost)
                completeUrl = envOptions.api.endpoint + url;

            super.get(completeUrl, options).subscribe((res: Response) => {
                observer.next(res);
            });
        });
    }

    post(url: string, body: any, options?: RequestOptionsArgs, omitHost?: boolean): Observable<Response> {
        return new Observable(observer => {
            let completeUrl: string = url;

            if(!omitHost)
                completeUrl = envOptions.api.endpoint + url;

            super.post(completeUrl, body, options).subscribe((res: Response) => {
                observer.next(res);
            });
        });
    }

    delete(url: string, options?: RequestOptionsArgs, omitHost?: boolean): Observable<Response> {
        return new Observable(observer => {
            let completeUrl: string = url;

            if(!omitHost)
                completeUrl = envOptions.api.endpoint + url;

            super.delete(completeUrl, options).subscribe((res: Response) => {
                observer.next(res);
            });
        });
    }
}

export function authHttpExtendedFactory(http: Http, options: RequestOptions) {    
    return new AuthHttpExtended(
        http, options);
}