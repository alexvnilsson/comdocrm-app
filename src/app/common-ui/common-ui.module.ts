import { ModalWrapperDirective } from './modal/modal-wrapper.directive';
import { VerticalNavigationViewComponent } from './vertical-nav/nav-view/nav-view.component';
import { VerticalNavigationItemComponent } from './vertical-nav/nav-item/nav-item.component';
import { VerticalNavigationComponent } from './vertical-nav';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from "clarity-angular";
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { LayoutService } from './layout/layout.service';

import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';

import { PopoverConfirm } from './popover-confirm/popover-confirm';

import { NavigationDirective } from './navigation/navigation.directive';
import { NavigationItemDirective } from './navigation/navigation-item.directive';
import { NavbarComponent, NavbarItemDirective } from './navbar';

import { ModalContainerComponent } from './modal/modal.component';
import { StateContainerComponent } from 'app/common-ui/containers/state-container';
import { ToolbarComponent } from 'app/common-ui/toolbar/toolbar.component';
import { ToolbarItemComponent } from 'app/common-ui/toolbar/item/toolbar-item.component';
import { SelectUserComponent } from './select-user/select-user.component';

import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ClarityModule,
    TooltipModule,
    PopoverModule,
    ModalModule,
    BsDropdownModule
  ],
  declarations: [
    PopoverConfirm,
    TabsComponent,
    TabComponent,

    VerticalNavigationComponent,
    VerticalNavigationItemComponent,
    VerticalNavigationViewComponent,

    NavigationDirective,
    NavigationItemDirective,
    NavbarComponent,
    NavbarItemDirective,

    ToolbarComponent,
    ToolbarItemComponent,

    SelectUserComponent,

    ModalContainerComponent,
    ModalWrapperDirective,
    StateContainerComponent,

    SpinnerComponent
  ],
  exports: [
    PopoverConfirm,
    TabsComponent,
    TabComponent,

    VerticalNavigationComponent,
    VerticalNavigationItemComponent,
    VerticalNavigationViewComponent,

    NavigationDirective,
    NavigationItemDirective,
    NavbarComponent,
    NavbarItemDirective,

    ToolbarComponent,
    ToolbarItemComponent,

    SelectUserComponent,

    ModalContainerComponent,
    ModalWrapperDirective,
    StateContainerComponent,

    SpinnerComponent
  ]
})
export class CommonUiModule {
  /**
   * Import in core module.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonUiModule,
      providers: [
        LayoutService
      ]
    };
  }
}
