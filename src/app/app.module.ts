import { environment } from '.env';

import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtModule, jwtModuleFactory } from 'common/http/jwt-module.factory';

import { StoreModule } from '@ngrx/store';
import { EffectsModule, Effect } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CustomRouterStateSerializer } from 'common/ngrx/utils';

import { ModalModule, TooltipModule, PopoverModule, BsDropdownModule, DatepickerModule } from 'ngx-bootstrap';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonUiModule } from 'app/common-ui';

import * as fromRoot from './app.store';
import * as usersStore from 'app/common/users/store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import * as accountLeadsStore from 'app/sales/accounts/store/accounts/leads';
import * as productsStore from 'app/sales/products/store';

import { AuthenticationModule, AuthenticationService } from 'app/common/authentication';

import { AccountsModule } from 'app/sales/accounts/accounts.module';
import { UserTasksModule } from 'app/user-tasks';

import { AccountsService } from './sales/accounts/services';
import { ProductsService } from './sales/products/services/products.service';

import { AppComponent } from './app.component';

import { CallbackComponent } from 'app/common/authentication/callback/callback.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './sales/accounts/views/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from 'app/common-ui/containers/page-not-found';

import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    JwtModule.forRoot(jwtModuleFactory()),
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(fromRoot.reducer),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrumentOnlyWithExtension() : [],
    EffectsModule.forRoot([
      accountsStore.AccountsEffects,
      accountLeadsStore.AccountLeadsEffects,
      usersStore.UsersEffects
    ]),
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
    CallbackComponent
  ],
  providers: [
    AccountsService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    ComdoCrmCommonModule,
    RouterModule
  ]
})
export class AppModule { }
