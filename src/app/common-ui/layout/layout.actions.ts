import { Action } from '@ngrx/store';

import { NavigationState } from './states/navigation';

export const LayoutActionTypes = {
    OPEN_MODAL: 'LAYOUT_OPEN_MODAL',
    CLOSE_MODAL: 'LAYOUT_CLOSE_MODAL'
};

export interface LayoutAction extends Action {
  type: string;
  payload?: any;
}

export class OpenModalAction implements LayoutAction {
    readonly type = LayoutActionTypes.OPEN_MODAL;

    constructor(public payload: string) {}
}

export class CloseModalAction implements LayoutAction {
    readonly type = LayoutActionTypes.CLOSE_MODAL;

    constructor() {}
}
