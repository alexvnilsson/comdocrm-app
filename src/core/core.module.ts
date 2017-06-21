import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { ModalModule, TooltipModule, BsDropdownModule, DatepickerModule } from 'ngx-bootstrap';
import { ComdoCrmCommonModule } from 'common';

import { ConfigurationService } from 'common/configuration';

import { AuthenticationModule, AuthenticationService, AuthHttpExtended, authHttpExtendedFactory } from 'common/authentication';
import { CustomRoute, AuthenticationGuard } from 'common/router';
import { AuthHttp } from 'angular2-jwt';

import { SalesModule } from 'module-sales';
import { UserTasksModule } from 'module-user-tasks';

import { CoreComponent } from './core.component';
import { CallbackComponent } from 'common/authentication/callback/callback.component';

import { NavbarComponent } from 'common/ui/components/navbar';
import { NavbarSubComponent, NavbarSubDirective } from 'common/ui/components/navbar-sub';

const routes: CustomRoute[] = [
    {
        path: 'auth/callback',
        component: CallbackComponent
    },
    {
        mainNav: true,
        path: 'sales',
        href: '/sales',
        text: 'Sales',
        faIcon: 'user-circle-o',
        children: [
            {
                mainNav: true,
                path: 'accounts',
                href: '/sales/accounts',
                loadChildren: '../module-sales/accounts/accounts.module#AccountsModule',
                text: 'Accounts',
                faIcon: 'building-o',
                canActivate: [AuthenticationGuard]
            }
        ]
    }
]

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        DatepickerModule.forRoot(),
        RouterModule.forRoot(routes),
        ComdoCrmCommonModule.forRoot()
    ],
    declarations: [
        CoreComponent,
        CallbackComponent,
        NavbarComponent
    ],
    providers: [
        
    ],
    bootstrap: [CoreComponent],
    exports: [
        ComdoCrmCommonModule,
        RouterModule
    ]
})
export class CoreModule {}