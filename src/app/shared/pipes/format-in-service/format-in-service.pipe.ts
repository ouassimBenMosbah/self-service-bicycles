import { Pipe, PipeTransform } from '@angular/core';
import { StationStatus } from 'src/app/core/interfaces/station-status.interface';

@Pipe({
  name: 'formatInService',
})
export class FormatInServicePipe implements PipeTransform {
  transform(value: StationStatus['status']): string {
    if (value === 'IN_SERVICE') {
      return 'In service';
    }
    if (value === 'OUT_OF_SERVICE') {
      return 'Out of service';
    }
    throw new Error(`The value "${value}" given to FormatInServicePipe is not supported`);
  }
}
