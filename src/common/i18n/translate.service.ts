import { Injectable } from '@angular/core';
import { TranslateService as NGXTranslateService, TranslateLoader, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/observable/of";

@Injectable()
export class TranslateService {
    constructor(
        private translateService: NGXTranslateService
    ){
        this.translateService.setDefaultLang('en');
        this.translateService.use(this.translateService.getBrowserLang());
    }

    public getModuleTranslation(moduleIdentifier: string): Observable<any> { 
        let subject = new Subject();

        this.translateService.getTranslation(`${moduleIdentifier}/${this.translateService.currentLang}`).subscribe(translation => {
            this.translateService.setTranslation(this.translateService.currentLang, translation, true);

            subject.next(true);
            subject.complete();
        });

        return subject.asObservable();
    }
}
