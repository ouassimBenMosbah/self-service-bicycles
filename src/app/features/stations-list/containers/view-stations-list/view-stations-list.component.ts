import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, share, shareReplay, tap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { MyArrayUtils } from 'src/app/shared/utils/array';
import { MyStringUtils } from 'src/app/shared/utils/string';
import { INITIAL_STATIONS_SORT_VALUE } from '../../constants/stations-sort.constant';
import { StationsFilterer } from '../../interfaces/stations-filters.interface';
import { StationsSort } from '../../interfaces/stations-sort.interface';
import { StationsListService } from '../../services/stations-list.service';

type AscIcon = 'north';
type DescIcon = 'south';

const ASC_ICON = 'north';
const DESC_ICON = 'south';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit, AfterViewInit {
  @ViewChild('listTab', { static: false }) listTab!: MatTabGroup;

  public stations$!: Observable<SplittedStations>;
  public allStations$!: Observable<Station[]>;
  public lastStationsUpdate: Date = new Date();
  public isAnyFavorite = false;
  public favoriteStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public standardStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public clientPosition$!: Observable<google.maps.LatLngLiteral>;

  private filterChanges$: BehaviorSubject<StationsFilterer[]> = new BehaviorSubject<StationsFilterer[]>([]);
  private stationsSort$: BehaviorSubject<StationsSort> = new BehaviorSubject(INITIAL_STATIONS_SORT_VALUE);

  constructor(
    private stationsListService: StationsListService,
    private stationsDatastoreService: StationsDatastoreService,
    private clientPositionService: ClientPositionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.clientPosition$ = this.clientPositionService.getClientPosition().pipe(shareReplay(1));

    this.stations$ = this.getFilteredStations();
    this.allStations$ = this.getStationsObservable();
  }

  private getStationsObservable(): Observable<Station[]> {
    return this.stations$.pipe(
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
    return combineLatest([
      this.stationsListService.stations,
      this.stationsListService.favoriteStations,
      this.filterChanges$.asObservable(),
      this.stationsSort$.asObservable(),
    ]).pipe(
      map(([standard, favorite, stationsFilterers, stationsSort]) => {
        this.isAnyFavorite = favorite.length > 0;
        this.setSortIcons(stationsSort);

        const favoriteStationsFiltered: Station[] = this.stationsListService.filterStations(favorite, stationsFilterers);
        const standardStationsFiltered: Station[] = this.stationsListService.filterStations(standard, stationsFilterers);

        return {
          favorite: MyArrayUtils.sortObjectsByKey(
            favoriteStationsFiltered,
            'name',
            stationsSort.favoriteStationsSortAsc ? MyStringUtils.compareStringsAsc : MyStringUtils.compareStringsDesc
          ),
          standard: MyArrayUtils.sortObjectsByKey(
            standardStationsFiltered,
            'name',
            stationsSort.standardStationsSortAsc ? MyStringUtils.compareStringsAsc : MyStringUtils.compareStringsDesc
          ),
        };
      })
    );
  }

  private setSortIcons(stationsSort: StationsSort): void {
    this.favoriteStationsSortIcon = stationsSort.favoriteStationsSortAsc ? ASC_ICON : DESC_ICON;
    this.standardStationsSortIcon = stationsSort.standardStationsSortAsc ? ASC_ICON : DESC_ICON;
  }

  public onSelectedTabChange({ index }: MatTabChangeEvent): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { tab: index } });
  }

  public onFilterChanges(stationsFilterer: StationsFilterer[]): void {
    this.filterChanges$.next(stationsFilterer);
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }

  public onStationClick(stationId: string): void {
    this.router.navigate([stationId], { relativeTo: this.route });
  }

  public onToggleSort(typeStations: 'favorite' | 'standard'): void {
    const sortValue = this.stationsSort$.getValue();
    this.stationsSort$.next({
      standardStationsSortAsc: typeStations === 'standard' ? !sortValue.standardStationsSortAsc : sortValue.standardStationsSortAsc,
      favoriteStationsSortAsc: typeStations === 'favorite' ? !sortValue.favoriteStationsSortAsc : sortValue.favoriteStationsSortAsc,
    });
  }
}
