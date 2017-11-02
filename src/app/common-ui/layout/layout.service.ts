import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as fromLayout from './layout.reducers';

import * as LayoutActions from './layout.actions';

import { NavigationState } from './states/navigation';

import { Injectable, OnInit } from '@angular/core';
import { RouterHelperService } from 'common/router/router-helper.service';

@Injectable()
export class LayoutService implements OnInit {
  protected navigation: NavigationState[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private routerHelper: RouterHelperService
  ) {}

  ngOnInit() {
    this.routerHelper.onRouteChanged.subscribe(event => {
      this.store.dispatch(new LayoutActions.CloseModalAction());
    });
  }

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