import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromLayout from './layout.reducers';
import * as fromLayoutActions from './layout.actions';

import { NavigationState } from './states/navigation';

import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  protected navigation: NavigationState[] = [];

  constructor() {}

  getNavigationState(id: string): Observable<NavigationState> {
    return new Observable(observer => {
      let n = this.navigation.filter(n => n.id === id)[0] || null;

      if (n !== null) {
        observer.next(n);
      } else {
        observer.next(null);
      }
    });
  }

  setNavigationState(state: NavigationState) {
    if (this.navigation.filter(n => n.id === state.id).length === 0) {
      this.navigation.push(state);
    } else {
      let nIndex = this.navigation.indexOf(this.navigation.find(n => n.id === state.id));

      if (nIndex != null) {
        this.navigation[nIndex] = state;
      }
    }
  }
}