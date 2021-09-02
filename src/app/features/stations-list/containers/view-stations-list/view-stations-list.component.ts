import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilters } from '../../interfaces/stations-filters.interface';
import { StationsListService } from '../../services/stations-list.service';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit, AfterViewInit {
  @ViewChild('listTab', { static: false }) listTab!: MatTabGroup;

  public stations$!: Observable<SplittedStations>;
  public allStations$!: Observable<Station[]>;
  public lastStationsUpdate: Date = new Date();
  public isAnyFavorite = false;

  private filterChanges$: BehaviorSubject<StationsFilters> = new BehaviorSubject(INITIAL_STATIONS_FILTERS_VALUE);

  constructor(
    private stationsListService: StationsListService,
    private stationsDatastoreService: StationsDatastoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.stations$ = this.getFilteredStations();
    this.allStations$ = this.stations$.pipe(
      map((station: SplittedStations) => {
        return station.favorite.concat(station.standard);
      }),
      tap(() => {
        this.lastStationsUpdate = new Date();
      })
    );
  }

  public ngAfterViewInit(): void {
    const selectedIndex: number | undefined = this.route.snapshot.queryParams?.tab;
    if (selectedIndex !== undefined) {
      this.listTab.selectedIndex = selectedIndex;
    }
  }

  private getFilteredStations(): Observable<SplittedStations> {
    return combineLatest([this.stationsListService.getSplittedStations(), this.filterChanges$.asObservable()]).pipe(
      map(([{ favorite, standard }, stationsFilters]: [SplittedStations, StationsFilters]) => {
        this.isAnyFavorite = favorite.length > 0;

        return {
          favorite: this.stationsListService.filterStations(favorite, stationsFilters),
          standard: this.stationsListService.filterStations(standard, stationsFilters),
        };
      })
    );
  }

  public onSelectedTabChange({ index }: MatTabChangeEvent): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { tab: index } });
  }

  public onFilterChanges(stationsFilters: StationsFilters): void {
    this.filterChanges$.next(stationsFilters);
  }

  public trackStationById(_index: number, station: Station): string {
    return station.station_id;
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }

  public onStationClick(stationId: string): void {
    this.router.navigate([stationId], { relativeTo: this.route });
  }
}
