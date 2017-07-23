import { Action } from '@ngrx/store';
import { Product } from '../models/products';

export const ActionTypes = {
    LOAD: 'PRODUCTS_LOAD',
    LOAD_RESULT: 'PRODUCTS_LOAD_RESULT'
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload: null) {}
}

export class LoadResult implements Action {
    readonly type = ActionTypes.LOAD_RESULT;

    constructor(public payload: {
        success: boolean,
        products: Product[]
    }) {}
}

export type ProductActions = 
    LoadAction
    | LoadResult;