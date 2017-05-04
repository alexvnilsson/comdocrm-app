import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

import { NavbarComponent } from './navbar.component';
import { NavbarItemComponent } from './navbar/item.component';
import { NavbarMobileItemComponent } from './navbar/item-mobile.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarItemComponent,
    NavbarMobileItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontAwesomeModule
  ],
  providers: [RouterOutletMap],
  bootstrap: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
