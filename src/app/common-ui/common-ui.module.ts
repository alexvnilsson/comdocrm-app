import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule, ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { PopoverConfirm } from './popover-confirm/popover-confirm';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { NavigationDirective } from './navigation/navigation.directive';
import { NavigationItemDirective } from './navigation/navigation-item.directive';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        PopoverModule
    ],
    declarations: [
        PopoverConfirm,
        TabsComponent,
        TabComponent,
        NavigationDirective,
        NavigationItemDirective
    ],
    exports: [
        PopoverConfirm,
        TabsComponent,
        TabComponent,
        NavigationDirective,
        NavigationItemDirective
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