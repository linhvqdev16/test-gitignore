import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tonumber',
})
export class NumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    ;
    return (value ?? 0 / 100000).toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
  }
}