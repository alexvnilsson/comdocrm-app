import { Component, OnInit, ContentChildren, HostListener, EventEmitter, AfterContentInit } from '@angular/core';
import { ToolbarItemComponent } from "app/common-ui/toolbar/item/toolbar-item.component";
import { Observable } from "rxjs/Observable";
import { ToolbarService } from "app/common-ui/toolbar/toolbar.service";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    providers: [ ToolbarService ]
})

export class ToolbarComponent implements OnInit, AfterContentInit {
    @ContentChildren(ToolbarItemComponent) items: ToolbarItemComponent[] = [];
    dropdown: boolean;

    static DropdownBreakpoint: number = 720;

    constructor(
        private toolbarService: ToolbarService
    ) { }

    ngOnInit() {
        this.toolbarService.dropdown.subscribe(dropdown => this.dropdown = dropdown);
    }

    ngAfterContentInit() {
        this.setDropDown();
    }

    @HostListener('window:resize', ['$event'])
    private onWindowResize(event: Event) {
        this.setDropDown();
    }

    private setDropDown() {
        let itemsWidth: number = 0;

        if(this.items && this.items.length > 0) {
            this.items.forEach(item => {
                itemsWidth += ( item.text.length * 10 );
            });
        }

        if(window.innerWidth <= ( itemsWidth + 25 )){
            this.toolbarService.setDropdown(true);
        }
        else {
            this.toolbarService.setDropdown(false);
        }
    }
}