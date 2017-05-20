import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestOptions } from '@angular/http';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { SlugifyService } from 'app/slugify.service';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

@NgModule({
  declarations: [
    
  ],
  imports: [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    Angular2FontAwesomeModule
  ],
  providers: [
    SlugifyService
  ],
  exports: [
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    Angular2FontAwesomeModule
  ]
})
export class SharedModule { }
