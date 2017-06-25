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

/**
 * Overrides get() method of parent, injects the hostname of the WebAPI into the requested path and performs the GET-request.
 * @see getBaseUrl()
 * 
 * @param url resource path
 * @param options optional request options
 */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable(observer => {
            super.get(envOptions.api.endpoint + url, options).subscribe((res: Response) => {
                observer.next(res);
            });
        });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable(observer => {
            super.post(envOptions.api.endpoint + url, body, options).subscribe((res: Response) => {
                observer.next(res);
            });
        });
    }
}

export function authHttpExtendedFactory(http: Http, options: RequestOptions) {    
    return new AuthHttpExtended(
        http, options);
}