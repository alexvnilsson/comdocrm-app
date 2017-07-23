import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { RouteTransitionAnimation } from 'app/common/ui/animations';

@Component({
    selector: 'ccrm-sales-products-list-view',
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