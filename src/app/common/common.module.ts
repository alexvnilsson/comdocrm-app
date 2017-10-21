import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, Route, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { SelectModule } from 'ng2-select';
import { MomentModule } from 'angular2-moment';
import { CommonUiModule } from 'app/common-ui';
import 'moment/locale/sv';

import { AuthenticationModule, AuthenticationService } from './authentication';
import { AuthenticationGuard } from './router/authentication.guard';
import { UsersService } from './users/users.service';
import { ClientService, ClientServiceInitFactory } from '../clients/client.service';

import { AuthHttp } from 'angular2-jwt';
import { AuthHttpExtended, authHttpExtendedFactory } from './authentication/auth-http-extended';

import { TabDirective } from './ui/directives/tab';

import { SpinnerComponent } from './ui/components/spinner/spinner.component';

import { WordSplicePipe } from './ui/pipes/word-splice.pipe';
import { TrimPipe } from './ui/pipes/trim.pipe';

import { InlineEditorComponent } from './ui/components/editor/inline-editor/inline-editor.component';

import { CallbackComponent } from './authentication/callback/callback.component';
import { DatepickerComponent } from './ui/components/datepicker/datepicker.component';
import { DashboardComponent } from 'app/sales/dashboard/views/dashboard/dashboard.component';
import { DatepickerDirective } from './ui/components/datepicker/datepicker.directive';
import { LoadingComponent } from './ui/components/loading/loading.component';
import { NavbarComponent, NavbarItemDirective } from 'app/common-ui/navbar';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonUiModule,
        AngularFontAwesomeModule,
        SelectModule,
        FormsModule,
        MomentModule,
        DatepickerModule
    ],
    declarations: [
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        DatepickerComponent,
        DatepickerDirective,
        LoadingComponent,
        
    ],
    providers: [
        
    ],
    exports: [
        ModalModule,
        TooltipModule,
        PopoverModule,
        BsDropdownModule,
        AngularFontAwesomeModule,
        SelectModule,
        FormsModule,
        RouterModule,
        MomentModule,
        DatepickerModule,
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        DatepickerComponent,
        DatepickerDirective,
        LoadingComponent,
        NavbarComponent,
        NavbarItemDirective
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
