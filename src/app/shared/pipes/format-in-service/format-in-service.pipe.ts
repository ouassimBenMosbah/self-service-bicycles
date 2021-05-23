import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInService',
})
export class FormatInServicePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'In service' : 'Out of service';
  }
}
