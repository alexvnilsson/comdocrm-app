import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './products';
import { AuthHttpExtended } from '../../common/authentication/auth-http-extended';

@Injectable()
export class ProductsService {
    private apiBaseAddr: string = '/api/sales/products';

    

    constructor(
        private http: AuthHttpExtended
    ) {}

    getAll(): Observable<Array<Product>> {
        return new Observable(observer => {
            this.http.get(`${this.apiBaseAddr}`)
            .map(res => res.json() as Array<Product> || null)
            .subscribe(products => observer.next(products), error => observer.error(error));
        });
    }
}
