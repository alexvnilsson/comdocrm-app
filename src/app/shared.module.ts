import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { MomentModule } from 'angular2-moment';

import { UserTaskModule } from 'comdocrm-lib-user-task';

import { ConfigurationService } from 'app/configuration.service';
import { SlugifyService } from 'app/slugify.service';
import { AuthService } from 'app/auth/auth.service';
import { AuthGuardService } from 'app/auth/auth-guard.service';
import { TranslateService } from 'app/i18n/translate.service';

import { PageNavbarComponent } from './navbar/page-navbar/page-navbar.component';
import { PageNavbarItemDirective } from './navbar/page-navbar/page-navbar-item.directive';
import { SpinnerComponent } from './ui/animations/spinner/spinner.component';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory, AuthHttpExtended } from 'app/auth/http.service';
import { InlineEditorComponent } from './ui/editor/inline-editor/inline-editor.component';
import { WordSplicePipe } from './ui/pipes/word-splice.pipe';
import { TrimPipe } from './ui/pipes/trim.pipe';
import { TabsComponent } from './ui/component/tabs/tabs.component';
import { TabsTabDirective } from './ui/component/tabs-tab.directive';

export function TranslateHttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/translations/', '.json');
}

@NgModule({
  declarations: [    
    PageNavbarComponent,
    PageNavbarItemDirective,
    SpinnerComponent,
    InlineEditorComponent,
    WordSplicePipe,
    TrimPipe,
    TabsComponent,
    TabsTabDirective
  ],
  imports: [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    Angular2FontAwesomeModule,
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: TranslateHttpLoaderFactory,
            deps: [ Http ]
        }
    }),
    MomentModule,
    UserTaskModule
  ],
  providers: [
    ConfigurationService,
    SlugifyService,
    AuthService,
    AuthGuardService,
    {
        provide: AuthHttpExtended,
        useFactory: authHttpServiceFactory,
        deps: [ Http, RequestOptions, ConfigurationService ]
    },
    TranslateService
  ],
  exports: [
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    Angular2FontAwesomeModule,
    FormsModule,
    TranslateModule,
    MomentModule,
    PageNavbarComponent,
    PageNavbarItemDirective,
    SpinnerComponent,
    InlineEditorComponent,
    TabsComponent,
    WordSplicePipe,
    TrimPipe,
    TabsTabDirective,
    UserTaskModule
  ]
})
export class SharedModule { }
