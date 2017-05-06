import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class HttpClientService {
    public static ContentTypes = {
        UrlEncoded: 'application/x-www-form-urlencoded'
    };

    public getRequestOptions(contentType: string): Headers {
        return new Headers({
            'Content-Type': contentType
        });
    }
}