import { Action } from '@ngrx/store';

export const LayoutActionTypes = {
    OPEN_MODAL: 'LAYOUT_OPEN_MODAL',
    CLOSE_MODAL: 'LAYOUT_CLOSE_MODAL'
};

export class OpenModalAction implements Action {
    readonly type = LayoutActionTypes.OPEN_MODAL;

    constructor(public payload: string) {}
}

export class CloseModalAction implements Action {
    readonly type = LayoutActionTypes.CLOSE_MODAL;

    constructor(public payload: string) {}
}

export type LayoutActions = 
    OpenModalAction
    | CloseModalAction