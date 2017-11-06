import { CustomRoute } from 'app/common/router';
import { Route } from '@angular/router';
import { AccountsListContainer } from './containers/accounts-list';
import { AccountLeadsListContainer } from './containers/account-leads-list';
import { AccountDetailsContainer } from './containers/account-details';

export const routes: CustomRoute[] = [
  {
      path: '',
      component: AccountsListContainer
  },
  {
      path: 'lead/:slug',
      component: AccountLeadsListContainer
  },
  {
      path: ':slug',
      component: AccountDetailsContainer
  }
]