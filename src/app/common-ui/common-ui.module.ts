import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { PopoverConfirm } from './popover-confirm/popover-confirm';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { NavigationDirective } from './navigation/navigation.directive';
import { NavigationItemDirective } from './navigation/navigation-item.directive';
import { ModalContainerComponent } from './modal/modal.component';
import { StateContainerComponent } from "app/common-ui/containers/state-container";

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        PopoverModule,
        ModalModule.forRoot()
    ],
    declarations: [
        PopoverConfirm,
        TabsComponent,
        TabComponent,
        NavigationDirective,
        NavigationItemDirective,
        ModalContainerComponent,
        StateContainerComponent
    ],
    exports: [
        PopoverConfirm,
        TabsComponent,
        TabComponent,
        NavigationDirective,
        NavigationItemDirective,
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