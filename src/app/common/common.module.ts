import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, Route, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng2-select';
import { MomentModule } from 'angular2-moment';
import { CommonUiModule } from 'app/common-ui';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import 'moment/locale/sv';

import { UsersService } from './users/users.service';

import { RouterHelperService } from 'common/router/router-helper.service';

import { TabDirective } from './ui/directives/tab';



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
    HttpClientModule,
    CommonUiModule,
    SelectModule,
    FormsModule,
    MomentModule,
    DatepickerModule
  ],
  declarations: [
    TabDirective,
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
    SelectModule,
    FormsModule,
    RouterModule,
    MomentModule,
    DatepickerModule,
    TabDirective,
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
        RouterHelperService,
        UsersService
      ]
    }
  }
}
