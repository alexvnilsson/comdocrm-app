import { Component, HostListener, ElementRef, ContentChildren, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewEncapsulation, Directive } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Directive({
    selector: '[popoverConfirm]'
})
export class PopoverConfirm implements OnInit {
    @Input() placement: string = "top";
    @Input() message: string;
    @Input() buttonClass: string;
    @Input() text: string = '&times;';

    @Input('popover') popover: PopoverDirective;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {

    }

    ngOnInit() {
        
        console.log(this.viewContainerRef);
    }

    @HostListener('document:click', ['$event'])
    private onDocumentClicked(event: Event) {
        if(!this.viewContainerRef.element.nativeElement.contains(event.target)) {
            
        }
    }
}
