import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'wordSplice'
})
export class WordSplicePipe implements PipeTransform {

    transform(value: string, numberOfWords: number): any {
        if (value) {
            let valueWords = value.split(' ');

            if (valueWords && valueWords.length > numberOfWords)
                return `${valueWords.splice(0, numberOfWords).join(' ')}...`;
        }

        return value;
    }

}
