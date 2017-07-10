﻿import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { ModalModule, TooltipModule, PopoverModule, BsDropdownModule, DatepickerModule } from 'ngx-bootstrap';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonUiModule } from 'app/common-ui/common-ui.module';

import { ConfigurationService } from 'app/common/configuration';

import { AuthenticationModule, AuthenticationService, AuthHttpExtended, authHttpExtendedFactory } from 'app/common/authentication';
import { CustomRoute, AuthenticationGuard } from 'app/common/router';
import { AuthHttp } from 'angular2-jwt';

import { SalesModule } from 'app/sales';
import { UserTasksModule } from 'app/user-tasks';

import { AppComponent } from './app.component';
import { CallbackComponent } from 'app/common/authentication/callback/callback.component';

import { NavbarComponent } from 'app/common/ui/components/navbar';
import { NavbarSubComponent, NavbarSubDirective } from 'app/common/ui/components/navbar-sub';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './sales/accounts/dashboard-view/dashboard-view.component';
import { AccountsService } from './sales/accounts/accounts.service';

const routes: CustomRoute[] = [
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
        mainNav: true,
        path: 'sales/products',
        href: '/sales/products',
        text: 'Produkter',
        loadChildren: 'app/sales/products/products.module#ProductsModule',
        faIcon: 'shopping-cart',
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: 'test',
        children: [
            
        ]
    }
]

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonUiModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        DatepickerModule.forRoot(),
        RouterModule.forRoot(routes),
        ComdoCrmCommonModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardViewComponent,
        CallbackComponent,
        NavbarComponent
    ],
    providers: [
        AccountsService
    ],
    bootstrap: [ AppComponent ],
    exports: [
        ComdoCrmCommonModule,
        RouterModule
    ]
})
export class AppModule {}