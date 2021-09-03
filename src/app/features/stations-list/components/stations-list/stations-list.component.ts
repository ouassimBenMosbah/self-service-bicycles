import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrls: ['./stations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsListComponent {
  @Input() title!: string;
  @Input() sortIcon!: string;
  @Input() isFavorite = false;
  @Input() stations: Station[] = [];

  @Output() toggleSort: EventEmitter<void> = new EventEmitter();
  @Output() toggleFavorite: EventEmitter<string> = new EventEmitter();
  @Output() stationClick: EventEmitter<string> = new EventEmitter();

  public onToggleSort(): void {
    this.toggleSort.emit();
  }

  public onToggleFavorite(stationId: string): void {
    this.toggleFavorite.emit(stationId);
  }

  public onStationClick(stationId: string): void {
    this.stationClick.emit(stationId);
  }

  public trackStationById(_index: number, station: Station): string {
    return station.station_id;
  }
}
