import { Directive, Input, Output, ViewChild, AfterViewInit, HostListener, ElementRef, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;

@Directive({
    selector: '[ccrmUiDatepicker]',
    exportAs: 'ccrmUiDatepicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerDirective),
            multi: true
        }
    ]
})
export class DatepickerDirective implements AfterViewInit, ControlValueAccessor, OnDestroy {
    @Input() autoOpen: boolean = false;
    @Input() keepOpen: boolean = false;

    @Output() onDateChanged: EventEmitter<Date> = new EventEmitter();

    private innerValue: Date;

    private changed = new Array<(value: Date) => void>();
    private touched = new Array<() => void>();

    get value(): Date {
        return this.innerValue;
    }

    set value(value: Date) {
        if(this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
            this.onDateChanged.next(value);
        }
    }

    touch() {
        this.touched.forEach(f => f());
    }

    writeValue(value: Date) {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: Date) => void) {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    datepickerOptions = {
        language: 'en'
    };

    model: Date = null;

    constructor(
        private elementRef: ElementRef
    ) {
        
    }

    ngAfterViewInit() {
        if(navigator.language) {
            this.datepickerOptions.language = navigator.language;
        }

        $(this.elementRef.nativeElement).datepicker(this.datepickerOptions)
            .on('changeDate', (event) => {
                if(event.date)
                    this.onDateChange(event.date);
            });

        if(this.autoOpen) {
            $(this.elementRef.nativeElement).datepicker('show');
        }

        if(this.keepOpen)
            $(this.elementRef.nativeElement).data('datepicker').hide = () => {};
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.preventDefault();

        return false;
    }

    onDateChange(date: Date) {
        if(date) {
            this.value = date;
        }
    }

    ngOnDestroy() {
        if(this.elementRef && this.elementRef.nativeElement) {
            $(this.elementRef.nativeElement).datepicker('destroy');
        }
    }
}
