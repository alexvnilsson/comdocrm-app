import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products';
import { RouteTransitionAnimation } from 'app/common/ui/animations';

@Component({
    selector: 'products-list-view',
    templateUrl: './list-view.component.html',
    animations: [
        RouteTransitionAnimation
    ],
    host: {
        '[@routeTransition]': 'true'
    }
})
export class ListViewComponent implements OnInit {
    products: Array<Product> = [];

    constructor(
        private productsService: ProductsService
    ) {}

    ngOnInit() {
        this.productsService.getAll().subscribe(products => this.products = products);
    }
}