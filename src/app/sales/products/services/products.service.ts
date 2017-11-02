import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/products';

@Injectable()
export class ProductsService {
  private apiBaseAddr: string = '/api/sales/products';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<Product>> {
    return new Observable(observer => {
      this.http.get(`${this.apiBaseAddr}`)
        .map(res => res as Array<Product> || null)
        .subscribe(products => observer.next(products), error => { });
    });
  }
}
