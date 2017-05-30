import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => { console.log(localStorage.getItem('scopes'));  return localStorage.getItem('id_token') } )
  }), http, options);
}