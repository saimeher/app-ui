import { Pipe } from '@angular/core';

@Pipe({
    name: 'dateToIso'
})
export class DateToIso {
    transform(value, args) {
        let newValue = new Date(value).toISOString();
        return newValue;
    }
}
