import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, Route, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { MomentModule } from 'angular2-moment';

import { AuthenticationModule, AuthenticationService } from './authentication';
import { AuthenticationGuard } from './router/authentication.guard';
import { ConfigurationService } from './configuration/configuration.service';
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

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFontAwesomeModule,
        FormsModule,
        MomentModule
    ],
    declarations: [
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        NavbarSubComponent,
        NavbarSubDirective
    ],
    providers: [
        
    ],
    exports: [
        ModalModule,
        TooltipModule,
        BsDropdownModule,
        AngularFontAwesomeModule,
        FormsModule,
        RouterModule,
        MomentModule,
        TabDirective,
        SpinnerComponent,
        WordSplicePipe,
        TrimPipe,
        InlineEditorComponent,
        NavbarSubComponent,
        NavbarSubDirective
    ]
})
export class ComdoCrmCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ComdoCrmCommonModule,
            providers: [
                RouterOutlet,
                ConfigurationService,
                AuthenticationService,
                {
                    provide: AuthenticationGuard,
                    useClass: AuthenticationGuard,
                    deps: [ AuthenticationService, Router ]
                },
                {
                    provide: AuthHttpExtended,
                    useFactory: authHttpExtendedFactory,
                    deps: [ Http, RequestOptions, ConfigurationService ]
                },
                UsersService
            ]
        }
    }
 }
