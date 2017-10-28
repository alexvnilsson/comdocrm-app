import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { envOptions } from '.environments/options';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/mergeMap";

export class AuthHttpExtended extends AuthHttp {
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
                  return sessionStorage.getItem('id_token')
              }),
              noJwtError: true
            }), http, options
        );
    }
}

export function authHttpExtendedFactory(http: Http, options: RequestOptions) {
    return new AuthHttpExtended(
        http, options);
}