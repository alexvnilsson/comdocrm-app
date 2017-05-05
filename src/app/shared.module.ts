import { NgModule } from '@angular/core';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { SlugifyService } from 'app/slugify.service';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

import { NavbarModule } from 'app/navbar.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    NavbarModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    Angular2FontAwesomeModule
  ],
  providers: [SlugifyService],
  bootstrap: [],
  exports: [
    NavbarModule,
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    Angular2FontAwesomeModule
  ]
})
export class SharedModule { }
