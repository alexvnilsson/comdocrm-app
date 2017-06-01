import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { PageNavbarComponent } from './navbar/page-navbar/page-navbar.component';
import { PageNavbarItemDirective } from './navbar/page-navbar/page-navbar-item.directive';
import { SpinnerComponent } from './ui/animations/spinner/spinner.component';
import { ConfigurationService } from 'app/configuration.service';
import { SlugifyService } from 'app/slugify.service';
import { AuthService } from 'app/auth/auth.service';
import { AuthGuardService } from 'app/auth/auth-guard.service';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from 'app/auth/http.service';
import { InlineEditorComponent } from './ui/editor/inline-editor/inline-editor.component';

@NgModule({
  declarations: [    
    PageNavbarComponent,
    PageNavbarItemDirective,
    SpinnerComponent,
    InlineEditorComponent
  ],
  imports: [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    Angular2FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    ConfigurationService,
    SlugifyService,
    AuthService,
    AuthGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  exports: [
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    Angular2FontAwesomeModule,
    FormsModule,
    PageNavbarComponent,
    PageNavbarItemDirective,
    SpinnerComponent,
    InlineEditorComponent
  ]
})
export class SharedModule { }
