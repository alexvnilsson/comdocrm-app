import { Injectable } from '@angular/core';
import { TranslateService as NGXTranslateService, TranslateLoader, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/observable/of";

@Injectable()
export class TranslateService extends NGXTranslateService {
    constructor(
        private translateStore: TranslateStore,
        private translateLoader: TranslateLoader,
        private translateParser: TranslateParser,
        missingTranslationHandler: MissingTranslationHandler,
        private ngxTranslateService: NGXTranslateService
    ){
        super(translateStore, translateLoader, translateParser, missingTranslationHandler);

        this.setDefaultLang('en');
        this.use(this.getBrowserLang());
    }

    public getModuleTranslation(moduleIdentifier: string): Observable<any> { 
        let subject = new Subject();

        this.getTranslation(`${moduleIdentifier}/${this.currentLang}`).subscribe(translation => {
            this.setTranslation(this.currentLang, translation, true);

            subject.next(true);
            subject.complete();
        });

        return subject.asObservable();
    }
}
