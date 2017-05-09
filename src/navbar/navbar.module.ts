import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';

import { NavbarComponent } from 'navbar/navbar.component';
import { NavbarRouteConfig } from 'navbar/navbar-item.route';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    SharedModule
  ],
  exports: [
      NavbarComponent
  ]
})
export class NavbarModule {}

export {
    NavbarRouteConfig
}