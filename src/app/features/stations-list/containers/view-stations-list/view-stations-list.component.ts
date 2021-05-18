import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilters } from '../../interfaces/stations-filters.interface';
import { StationsListService } from '../../services/stations-list.service';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit {
  public stations$!: Observable<Station[]>;

  private filterChanges$: BehaviorSubject<StationsFilters> =
    new BehaviorSubject(INITIAL_STATIONS_FILTERS_VALUE);

  constructor(private stationsListService: StationsListService) {}

  public ngOnInit(): void {
    this.stations$ = this.getFilteredStations();
  }

  private getFilteredStations(): Observable<Station[]> {
    return combineLatest([
      this.stationsListService.getStations(),
      this.filterChanges$.asObservable(),
    ]).pipe(
      map(([stations, stationsFilters]: [Station[], StationsFilters]) => {
        return this.stationsListService.filterStations(
          stations,
          stationsFilters
        );
      })
    );
  }

  public onFilterChanges(stationsFilters: StationsFilters): void {
    this.filterChanges$.next(stationsFilters);
  }
}
