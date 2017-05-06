import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {
    public onSectionChanged: EventEmitter<string> = new EventEmitter();

    public setSection(section: string) {
        this.onSectionChanged.emit(section);
    }
}