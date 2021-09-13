import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInService',
})
export class FormatInServicePipe implements PipeTransform {
  transform(value: boolean): string {
    if (typeof value == 'boolean') {
      return value ? 'In service' : 'Out of service';
    }
    throw new Error('The value given to FormatInServicePipe must be a boolean');
  }
}
