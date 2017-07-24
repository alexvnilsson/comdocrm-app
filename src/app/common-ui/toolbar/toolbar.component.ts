import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/fromEvent';

import { Component, OnInit, ContentChildren, HostListener, EventEmitter, AfterContentInit, ElementRef, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { ToolbarItemComponent } from "app/common-ui/toolbar/item/toolbar-item.component";
import { Observable } from "rxjs/Observable";
import { ToolbarService } from "app/common-ui/toolbar/toolbar.service";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [ './toolbar.component.scss' ],
    providers: [ ToolbarService ]
})

export class ToolbarComponent implements OnInit, AfterViewInit {
    @ViewChild('wrapper') toolbarWrapperRef: ElementRef;
    @ViewChild('toolbar') toolbarRef: ElementRef;
    @ContentChildren(ToolbarItemComponent) items: ToolbarItemComponent[] = [];

    @ViewChild('navLeft') navLeftRef: ElementRef;
    @ViewChild('navRight') navRightRef: ElementRef;

    private resized: Subject<any> = new Subject();
    private resized$: Observable<any> = this.resized.asObservable().debounceTime(150);

    private scrolled: Subject<{ direction: string, pixels: number }> = new Subject();
    private scrolled$: Observable<{ direction: string, pixels: number }> = this.scrolled.asObservable();
    
    private isOverflown: boolean = false;

    private toolbarUi = {
        width: null,
        itemsWidth: null,
        left: 0
    };

    constructor(
        private toolbarService: ToolbarService,
        private elRef: ElementRef
    ) { }

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.getToolbarUiState();

        this.resized$.subscribe(this.getToolbarUiState.bind(this));
        this.scrolled$.subscribe(this.onToolbarScrolled.bind(this));

        this.resized.next();
    }

    @HostListener('window:resize', ['$event'])
    private onWindowResize(event: Event) {
        this.resized.next(event);
    }

    onToolbarScrollClicked(direction: string) {
        this.scrolled.next({ direction: direction, pixels: 100 });
    }

    getPositionLeft(): number {
        return this.isOverflown ? this.toolbarUi.left : 0;
    }

    private onToolbarScrolled(event: { direction: string, pixels: number }) {
        let newLeft: number;

        switch(event.direction) {
            case 'left': 
                newLeft = this.toolbarUi.left + event.pixels;
            break;

            case 'right':
                newLeft = this.toolbarUi.left - event.pixels;
            break;
        }

        if(newLeft !== null) {
            let maxLeft = ( (this.toolbarUi.itemsWidth - this.toolbarUi.width) - this.navRightRef.nativeElement.offsetWidth );

            let tNewLeft = ( ( newLeft + this.toolbarUi.left ) + maxLeft );

            newLeft = ( ( newLeft > -51 && newLeft < 51 ) ? 0 : newLeft );
            newLeft = ( ( tNewLeft - maxLeft ) > -51 && ( tNewLeft - maxLeft ) < 51 ? maxLeft : newLeft );

            this.toolbarUi.left = newLeft;
        }
    }

    private getToolbarUiState() {
        this.toolbarUi.itemsWidth = this.toolbarRef.nativeElement.offsetWidth;
        this.toolbarUi.width = this.toolbarWrapperRef.nativeElement.offsetWidth;

        console.log({
            items: this.toolbarUi.itemsWidth,
            wrapper: this.toolbarUi.width
        });

        var paddedWidth = ( this.toolbarUi.itemsWidth + 100 );
        this.isOverflown = ( paddedWidth >= this.toolbarUi.width );
    }
}