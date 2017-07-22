import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ToolbarService {
    dropdown: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    setDropdown(value: boolean) {
        this.dropdown.emit(value);
    }
}