import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trim'
})
export class TrimPipe implements PipeTransform {

    transform(value: string, maxLength: number): any {
        if(value) {
            if(value.length > maxLength)
                return `${value.substr(0, maxLength)}...`;
            else
                return value;
        }

        return null;
    }

}
