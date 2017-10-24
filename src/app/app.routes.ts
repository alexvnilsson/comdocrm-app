import { CustomRoute, AuthenticationGuard } from 'app/common/router';

import { CallbackComponent } from 'app/common/authentication/callback/callback.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './sales/accounts/views/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from 'app/common-ui/containers/page-not-found';
import { SelectUserComponent } from './core/components/select-user/select-user.component';

export const AppRoutes: CustomRoute[] = [
  {
      path: 'auth/callback',
      component: CallbackComponent
  },
  {
      path: '',
      component: DashboardComponent,
      canActivate: [ AuthenticationGuard ]
  },
  {
      mainNav: true,
      path: 'sales/accounts',
      href: '/sales/accounts',
      text: 'Kunder',
      loadChildren: 'app/sales/accounts/accounts.module#AccountsModule',
      faIcon: 'user-circle-o',
      canActivate: [ AuthenticationGuard ]
  },
  {
      mainNav: false,
      path: 'sales/products',
      href: '/sales/products',
      text: 'Produkter',
      loadChildren: 'app/sales/products/products.module#ProductsModule',
      faIcon: 'shopping-cart',
      canActivate: [ AuthenticationGuard ]
  },
  // {
  //     path: '**',
  //     component: PageNotFoundComponent
  // }
];
