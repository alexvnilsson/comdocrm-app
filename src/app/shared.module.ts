import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { ModalModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { SlugifyService } from 'app/slugify.service';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { PageNavbarComponent } from './navbar/page-navbar/page-navbar.component';
import { PageNavbarItemDirective } from './navbar/page-navbar/page-navbar-item.directive';

@NgModule({
  declarations: [    
    PageNavbarComponent, PageNavbarItemDirective
  ],
  imports: [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    Angular2FontAwesomeModule,
    FormsModule
  ],
  providers: [
    SlugifyService
  ],
  exports: [
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    Angular2FontAwesomeModule,
    FormsModule,
    PageNavbarComponent,
    PageNavbarItemDirective
  ]
})
export class SharedModule { }
