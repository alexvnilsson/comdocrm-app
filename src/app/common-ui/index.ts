import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { FormsModule } from '@angular/forms';

import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';

import { PopoverConfirm } from './popover-confirm/popover-confirm';

import { NavigationDirective } from './navigation/navigation.directive';
import { NavigationItemDirective } from './navigation/navigation-item.directive';
import { NavbarComponent, NavbarItemDirective } from './navbar';

import { ModalContainerComponent } from './modal/modal.component';
import { StateContainerComponent } from "app/common-ui/containers/state-container";
import { ToolbarComponent } from "app/common-ui/toolbar/toolbar.component";
import { ToolbarItemComponent } from "app/common-ui/toolbar/item/toolbar-item.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TooltipModule,
        PopoverModule,
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        AngularFontAwesomeModule
    ],
    declarations: [
        PopoverConfirm,
        TabsComponent,
        TabComponent,
        
        NavigationDirective,
        NavigationItemDirective,
        NavbarComponent,
        NavbarItemDirective,

        ToolbarComponent,
        ToolbarItemComponent,

        ModalContainerComponent,
        StateContainerComponent
    ],
    exports: [
        AngularFontAwesomeModule,

        PopoverConfirm,
        TabsComponent,
        TabComponent,

        NavigationDirective,
        NavigationItemDirective,
        NavbarComponent,
        NavbarItemDirective,

        ToolbarComponent,
        ToolbarItemComponent,

        ModalContainerComponent,
        StateContainerComponent
    ]
})
export class CommonUiModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonUiModule,
            providers: [

            ]
        };
    }
}