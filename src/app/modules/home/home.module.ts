import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const moduleRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
          scopes: ['nothing']
        }
    }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  providers: []
})
export class HomeModule { }
