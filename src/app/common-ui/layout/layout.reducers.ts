import { createSelector } from 'reselect';
import { NavigationState } from './states/navigation';
import * as routerStore from '@ngrx/router-store'
import { LayoutAction, LayoutActionTypes } from './layout.actions';
import * as fromLayout from './layout.actions';

export interface State {
  openedModal: string;
  navigation: NavigationState[]
};

export const initialState = {
  openedModal: null,
  navigation: []
};

export function reducer(state: State = initialState, action: LayoutAction): State {
  switch (action.type) {
    case LayoutActionTypes.OPEN_MODAL: {
      if (action instanceof fromLayout.OpenModalAction) {
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

export const navigationStates = (state: State) => state.navigation;