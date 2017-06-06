import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'accountName'
})
export class AccountNamePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        if(value) {
            let valueWords = value.split(' ');

            if(valueWords && valueWords.length > 12)
                return valueWords.splice(0, 12).join(' ');
        }

        return value;
    }

}
