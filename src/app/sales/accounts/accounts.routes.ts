import { Route } from '@angular/router';
import { AccountsListContainerComponent } from './containers/accounts-list';
import { AccountDetailsContainerComponent } from './containers/account-details';

export const routes: Route[] = [
    {
        path: '',
        component: AccountsListContainerComponent
    },
    {
        path: ':slug',
        component: AccountDetailsContainerComponent
    }
]