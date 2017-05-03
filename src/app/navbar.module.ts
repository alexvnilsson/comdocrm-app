import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RouterOutletMap],
  bootstrap: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
