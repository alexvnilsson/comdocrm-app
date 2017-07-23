import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as fromRoot from 'app/app.store';

import { Product } from '../models/products';
import * as fromProducts from './products.reducer';
import * as actions from './products.actions';
import { ProductsService } from "app/sales/products/services/products.service";

@Injectable()
export class ProductsEffects {
    @Effect()
    all$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .startWith(new actions.LoadAction(null))
        .debounceTime(300)
        .map(toPayload)
        .switchMap(() => {
            const nextLoad$ = this.actions$.ofType(actions.ActionTypes.LOAD).skip(1);

            return this.productsService.getAll()
                .map((products: Product[]) => new actions.LoadResult({
                    success: true,
                    products: products
                }));
        });

    // @Effect()
    // add$: Observable<Action> = this.actions$
    //     .ofType(accountsActions.ActionTypes.ADD)
    //     .map((action: accountsActions.AddAction) => action.payload)
    //     .mergeMap(_account => 
    //         this.accountsService.add(_account)
    //         .switchMap(result => 
    //             Observable.of({ type: '', payload: result })
    //         )
    //     );

    constructor(
        private store$: Store<fromRoot.State>,
        private actions$: Actions,
        private productsService: ProductsService
    ) {}
}