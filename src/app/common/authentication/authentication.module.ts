import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComdoCrmCommonModule } from '../common.module';
import { RouterModule, Route } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

const routes: Route[] = [
  {
    path: 'auth/callback',
    component: CallbackComponent
  }
]

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  declarations: [
    CallbackComponent,
    
  ],
  exports: [
    
  ],
  bootstrap: [ CallbackComponent ]
})
export class AuthenticationModule { }
