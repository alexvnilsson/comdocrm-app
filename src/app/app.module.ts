﻿import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '.env';

import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ClarityModule } from "clarity-angular";

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

import { reducers, metaReducers } from './app.store';
import * as usersStore from 'app/common/users/store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import * as accountLeadsStore from 'app/sales/accounts/store/accounts/leads';

import { AuthenticationModule } from 'app/common/authentication/authentication.module';

import { AccountsModule } from 'app/sales/accounts/accounts.module';
import { UserTasksModule } from 'app/user-tasks';

import { AccountsService } from './sales/accounts/services';
import { AccountLeadsService } from 'app/sales/accounts/services/account-leads.service';

import { AppComponent } from './app.component';

import { CallbackComponent } from 'app/common/authentication/callback/callback.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './sales/accounts/views/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from 'app/common-ui/containers/page-not-found';

import { AppRoutes } from './app.routes';
import { NavigationComponent } from './core/navigation/navigation.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ClarityModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers } ),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 5
    }) : [],
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
    MomentModule,
    AuthenticationModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent
  ],
  providers: [
    AccountsService,
    AccountLeadsService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
