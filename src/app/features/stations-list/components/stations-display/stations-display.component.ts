import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-stations-display',
  templateUrl: './stations-display.component.html',
  styleUrls: ['./stations-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsDisplayComponent implements OnInit {
  @Input() station!: Station;
  @Input() isFavorite: boolean = false;

  @Output() toggleFavorite: EventEmitter<void> = new EventEmitter();
  @Output() stationClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public onFavoriteButtonClick(): void {
    this.toggleFavorite.emit();
  }

  public onStationClick(): void {
    this.stationClick.emit();
  }
}
