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
    @Input() autoOpen: boolean;
    @Input() autoClose: boolean;
    @Input() keepOpen: boolean ;
    @Input() orientation: string;
    @Input() startDate: Date;

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

    datepickerOptions: {
        language: string;
        autoclose: boolean;
        orientation: string;
        startDate: Date;
    };

    model: Date = null;

    constructor(
        private elementRef: ElementRef
    ) {
        
    }

    ngAfterViewInit() {
        this.setDatepickerConfiguration();

        $(this.elementRef.nativeElement).datepicker(this.datepickerOptions)
            .on('changeDate', (event) => {
                if(event.date)
                    this.onDateChange(event.date);
            });

        if(this.autoOpen)
            $(this.elementRef.nativeElement).datepicker('show');

        if(this.keepOpen)
            $(this.elementRef.nativeElement).data('datepicker').hide = () => {};
    }

    private setDatepickerConfiguration() {
        this.datepickerOptions = {
            language: navigator.language || 'en',
            autoclose: this.autoClose || false,
            orientation: this.orientation || 'auto',
            startDate: this.startDate || new Date(0, 0, 0)
        };
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.preventDefault();

        return false;
    }

    public onClearDate() {
        if(this.elementRef && this.elementRef.nativeElement)
            $(this.elementRef.nativeElement).datepicker('clearDates');

        this.value = null;
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
