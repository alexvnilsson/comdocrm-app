import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { RouterModule, Route } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

const routes: Route[] = [
  {
    path: 'callback',
    component: CallbackComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CallbackComponent],
  exports: [
    RouterModule
  ],
  bootstrap: [ CallbackComponent ]
})
export class AuthModule { }
