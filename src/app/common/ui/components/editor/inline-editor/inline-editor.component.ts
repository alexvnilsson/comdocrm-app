import { Component, Input, Output, OnInit, AfterViewInit, ViewChild, OnChanges, AfterViewChecked, SimpleChanges, ElementRef, forwardRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ccrm-ui-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineEditorComponent),
      multi: true
    }
  ],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: '0' })),
      transition(':enter', [
        style({ opacity: '0' }),
        animate(250, style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '0' }),
      ]),
      transition('* => *', [
        style({ opacity: '0' }),
        animate(250, style({ opacity: '1' }))
      ])
    ]
    )]
})
export class InlineEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  propagateChange = (_: any) => { };

  @ViewChild('inlineEditorInput') inlineEditorInput: ElementRef;
  @Input('model') _model: any;
  @Input() placeholder: string;

  public isEditing: boolean = false;

  @Output() onModelUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  writeValue(value: any) {
    if (value)
      this.model = value;
  }

  get model() {
    return this._model;
  }

  set model(model: any) {
    this._model = model;
    this.propagateChange(model);
  }

  onEditorEnabled() {
    setTimeout(() => {
      this.inlineEditorInput.nativeElement.focus();
    }, 200);
  }

  onEditorDisabled() {

  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onEditorInputSubmit(value: any) {
    this.model = value;
    this.setEditingMode(false);

    this.onModelUpdated.next(this.model);
  }

  setEditingMode(state: boolean) {
    if (state) {
      this.isEditing = true;

      this.onEditorEnabled();
    }
    else {
      this.isEditing = false;
    }
  }

  clickEditLink(ev: Event) {
    this.setEditingMode(!this.isEditing);

    ev.preventDefault();
    return false;
  }
}
