import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilters } from '../../interfaces/stations-filters.interface';
import { StationsListService } from '../../services/stations-list.service';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit {
  public stations$!: Observable<SplittedStations>;

  private filterChanges$: BehaviorSubject<StationsFilters> =
    new BehaviorSubject(INITIAL_STATIONS_FILTERS_VALUE);

  constructor(
    private stationsListService: StationsListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.stations$ = this.getFilteredStations();
  }

  private getFilteredStations(): Observable<SplittedStations> {
    return combineLatest([
      this.stationsListService.getSplittedStations(),
      this.filterChanges$.asObservable(),
    ]).pipe(
      map(
        ([{ favorite, standard }, stationsFilters]: [
          SplittedStations,
          StationsFilters
        ]) => {
          return {
            favorite: this.stationsListService.filterStations(
              favorite,
              stationsFilters
            ),
            standard: this.stationsListService.filterStations(
              standard,
              stationsFilters
            ),
          };
        }
      )
    );
  }

  public onFilterChanges(stationsFilters: StationsFilters): void {
    this.filterChanges$.next(stationsFilters);
  }

  public trackStationById(_index: number, station: Station): string {
    return station.station_id;
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsListService.toggleFavoriteStation(stationId);
  }

  public onStationClick(stationId: string): void {
    this.router.navigate([stationId], { relativeTo: this.route });
  }
}
