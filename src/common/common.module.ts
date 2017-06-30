import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, Route, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { NglModule } from 'ng-lightning/ng-lightning';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MomentModule } from 'angular2-moment';

import { AuthenticationModule, AuthenticationService } from './authentication';
import { AuthenticationGuard } from './router/authentication.guard';
import { UsersService } from './users/users.service';

import { AuthHttp } from 'angular2-jwt';
import { AuthHttpExtended, authHttpExtendedFactory } from './authentication/auth-http-extended';

import { NavbarComponent } from './ui/components/navbar';
import { NavbarSubComponent, NavbarSubDirective } from './ui/components/navbar-sub';

import { TabDirective } from './ui/directives/tab';

import { SpinnerComponent } from './ui/components/spinner/spinner.component';

import { WordSplicePipe } from './ui/pipes/word-splice.pipe';
import { TrimPipe } from './ui/pipes/trim.pipe';

import { InlineEditorComponent } from './ui/components/editor/inline-editor/inline-editor.component';

import { CallbackComponent } from './authentication/callback/callback.component';
import { DatepickerComponent } from './ui/components/datepicker/datepicker.component';
import { DashboardComponent } from '../module-sales/dashboard/dashboard.component';
import { DatepickerDirective } from './ui/components/datepicker/datepicker.directive';
import { LoadingComponent } from './ui/components/loading/loading.component';
import { NavigationDirective } from './navigation/navigation.directive';
import { NavigationItemDirective } from './navigation/navigation-item.directive';
import { ClientService, ClientServiceInitFactory } from '../clients/client.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFontAwesomeModule,
        FormsModule,
        MomentModule,
        DatepickerModule,
        NglModule
    ],
    declarations: [
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        NavbarSubComponent,
        NavbarSubDirective,
        NavigationDirective,
        NavigationItemDirective,
        DatepickerComponent,
        DatepickerDirective,
        LoadingComponent
    ],
    providers: [
        
    ],
    exports: [
        ModalModule,
        TooltipModule,
        PopoverModule,
        BsDropdownModule,
        AngularFontAwesomeModule,
        FormsModule,
        RouterModule,
        MomentModule,
        NglModule,
        DatepickerModule,
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        NavbarSubComponent,
        NavbarSubDirective,
        NavigationDirective,
        NavigationItemDirective,
        DatepickerComponent,
        DatepickerDirective,
        LoadingComponent
    ]
})
export class ComdoCrmCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ComdoCrmCommonModule,
            providers: [
                RouterOutlet,
                AuthenticationService,
                {
                    provide: AuthenticationGuard,
                    useClass: AuthenticationGuard,
                    deps: [ AuthenticationService, Router ]
                },
                {
                    provide: AuthHttpExtended,
                    useFactory: authHttpExtendedFactory,
                    deps: [ Http, RequestOptions ]
                },
                ClientService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: ClientServiceInitFactory,
                    deps: [ ClientService ],
                    multi: true
                },
                UsersService
            ]
        }
    }
 }
