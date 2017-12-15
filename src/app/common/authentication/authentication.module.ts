import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from 'app/common-ui';
import { RouterModule, Router, Route } from '@angular/router';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthenticationGuard } from 'app/common/router';
import { JwtInterceptorService } from 'common/http/jwt.interceptor';

import { AuthenticationService } from './authentication.service';

import { CallbackComponent } from './callback/callback.component';
import { ErrorComponent } from './callback/error/error.component';

const routes: Route[] = [
  {
    path: 'auth/callback',
    component: CallbackComponent
  }
]

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
    CommonUiModule
  ],
  declarations: [
    CallbackComponent,
    ErrorComponent
  ],
  exports: [
    CallbackComponent,
    ErrorComponent
  ],
  bootstrap: []
})
export class AuthenticationModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true,
        },
        {
          provide: AuthenticationGuard,
          useClass: AuthenticationGuard,
          deps: [AuthenticationService, Router]
        },
      ]
    };
  }
}
