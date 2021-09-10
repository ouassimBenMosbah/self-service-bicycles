import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-station-information-sheet',
  templateUrl: './station-information-sheet.component.html',
  styleUrls: ['./station-information-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationInformationSheetComponent implements OnChanges {
  @Input() station!: Station;
  @Input() isFavorite!: boolean;

  public numDocksOutOfService: number = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.station) {
      const station: Station = changes.station.currentValue;
      this.numDocksOutOfService = station.capacity - station.num_bikes_available - station.num_docks_available;
    }
  }
}
