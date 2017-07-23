import 'rxjs/add/operator/map';

import { ActionReducer, Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as productsStore from './products.actions';
import { Product } from "app/sales/products/models/products";

export interface State {
    loading: boolean;
    entities: Product[];
    selectedProduct: string | null;
}

export const initialState: State = {
    loading: null,
    entities: [],
    selectedProduct: null
};

export function reducer(state = initialState, action: productsStore.ProductActions) {
    switch(action.type) {
        case productsStore.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case productsStore.ActionTypes.LOAD_RESULT: {
            if (action instanceof productsStore.LoadResult) {
                if (action.payload.success) {
                    return Object.assign({}, state, {
                        loading: false,
                        entities: action.payload.products
                    });
                }
            }
        }
    }
}

export const all = (state: State) => state.entities;