import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ToolbarService } from "app/common-ui/toolbar/toolbar.service";

@Component({
    selector: 'toolbar-item',
    templateUrl: './toolbar-item.component.html'
})

export class ToolbarItemComponent implements OnInit {
    @Input() dropdown: boolean;

    @Input() link: string = null;
    @Input() text: string = '';
    @Input() icon: string = null;

    constructor(public elRef: ElementRef) { }

    ngOnInit() {
        
    }
}