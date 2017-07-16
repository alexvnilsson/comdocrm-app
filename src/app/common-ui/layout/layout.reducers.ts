import { LayoutActions, LayoutActionTypes } from './layout.actions';
import * as fromLayout from './layout.actions';

export interface State {
    openedModal: string;
};

export const initialState = {
    openedModal: null
};

export function reducer(state: State = initialState, action: LayoutActions): State {
    switch(action.type) {
        case LayoutActionTypes.OPEN_MODAL: {
            if(action instanceof fromLayout.OpenModalAction){
                return Object.assign({}, state, {
                    openedModal: action.payload
                });
            }
        }

        case LayoutActionTypes.CLOSE_MODAL: {
            return Object.assign({}, state, {
                openedModal: null
            });
        }

        default: {
            return state;
        }
    }
}

export const openedModalName = (state: State) => state.openedModal;