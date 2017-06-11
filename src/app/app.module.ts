import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ComdoCrmCommonModule } from '@comdocrm/common';

import { SalesModule } from '@comdocrm/feature-module-sales';

import { AppComponent } from './app.component';

// const moduleRoutes = [
//     {
//         path: '',
//         loadChildren: 'app/modules/home/home.module#HomeModule'
//     },
//     {
//         mainNav: true,
//         path: 'sales',
//         href: '/sales',
//         text: 'App.Navigation.Sales.Sales',
//         faIcon: 'user-circle-o',
//         children: [
//             {
//                 mainNav: true,
//                 path: 'accounts',
//                 href: '/sales/accounts',
//                 loadChildren: 'app/modules/sales/accounts/accounts.module#AccountsModule',
//                 text: 'App.Navigation.Sales.AccountsAndProspects',
//                 faIcon: 'building-o',
//                 canActivate: [AuthenticationGuard]
//             }
//         ]
//     },
//     {
//         mainNav: true,
//         path: 'test',
//         href: '/test',
//         text: 'Test',
//         children: [
//             {
//                 mainNav: true,
//                 path: 'test',
//                 href: '/test/test',
//                 text: 'Test',
//                 redirectTo: '/'
//             }
//         ]
//     },
//     {
//         mainNav: true,
//         path: 'ads',
//         href: '/ads',
//         loadChildren: 'app/modules/online-ads/online-ads.module#OnlineAdsModule',
//         text: 'App.Navigation.Ads.Ads',
//         faIcon: 'newspaper-o'
//     },
//     {
//         mainNav: false,
//         path: 'auth',
//         loadChildren: 'app/auth/auth.module#AuthModule'
//     }
// ];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ComdoCrmCommonModule,
        RouterModule.forRoot([]),
        SalesModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        RouterOutlet
    ],
    bootstrap: [AppComponent],
    exports: [

    ]
})
export class AppModule { }