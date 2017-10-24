import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule, Effect } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ModalModule, TooltipModule, PopoverModule, BsDropdownModule, DatepickerModule } from 'ngx-bootstrap';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonUiModule } from 'app/common-ui';

import { ConfigurationService } from 'app/common/configuration';

import * as fromRoot from './app.store';

import * as usersStore from 'app/common/users/store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import * as productsStore from 'app/sales/products/store';

import { AuthenticationModule, AuthenticationService, AuthHttpExtended, authHttpExtendedFactory } from 'app/common/authentication';
import { AuthHttp } from 'angular2-jwt';

import { SalesModule } from 'app/sales';
import { UserTasksModule } from 'app/user-tasks';

import { AccountsService } from './sales/accounts/services';
import { ProductsService } from './sales/products/services/products.service';

import { AppComponent } from './app.component';

import { CallbackComponent } from 'app/common/authentication/callback/callback.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './sales/accounts/views/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from 'app/common-ui/containers/page-not-found';
import { SelectUserComponent } from './core/components/select-user/select-user.component';

import { AppRoutes } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        FlexLayoutModule,
        RouterModule.forRoot(AppRoutes),
        StoreModule.provideStore(fromRoot.reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(accountsStore.effects.AccountsEffects),
        EffectsModule.run(usersStore.effects.UsersEffects),
        EffectsModule.run(productsStore.effects.ProductsEffects),
        CommonUiModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        DatepickerModule.forRoot(),
        ComdoCrmCommonModule.forRoot(),
        MomentModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardViewComponent,
        CallbackComponent,
        SelectUserComponent
    ],
    providers: [
        AccountsService,
        ProductsService
    ],
    bootstrap: [ AppComponent ],
    exports: [
        ComdoCrmCommonModule,
        RouterModule
    ]
})
export class AppModule {}
