import { Component, OnInit } from '@angular/core';
import { Product } from "app/sales/products/models/products";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as fromRoot from 'app/app.store';
import * as productsStore from '../store';

@Component({
    selector: 'ccrm-sales-products-list',
    template: `<ccrm-sales-products-list-view [products]="products$ | async"></ccrm-sales-products-list-view>`
})

export class ProductsListContainer implements OnInit {
    products$: Observable<Product[]>;

    constructor(private store$: Store<fromRoot.State>) { }

    ngOnInit() {
        this.products$ = this.store$.select(fromRoot.productsState).select(productsStore.fromProducts.all);
    }
}