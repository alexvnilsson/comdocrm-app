import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router, RouterOutlet, Route } from '@angular/router';
import { ModalModule, TooltipModule, PopoverModule, BsDropdownModule, DatepickerModule } from 'ngx-bootstrap';
import { NglModule } from 'ng-lightning/ng-lightning';
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
        path: 'sales/accounts',
        href: '/sales/accounts',
        text: 'Kunder',
        loadChildren: '../module-sales/accounts/accounts.module#AccountsModule',
        faIcon: 'user-circle-o',
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
        NglModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
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
    bootstrap: [ CoreComponent ],
    exports: [
        ComdoCrmCommonModule,
        RouterModule
    ]
})
export class CoreModule {}