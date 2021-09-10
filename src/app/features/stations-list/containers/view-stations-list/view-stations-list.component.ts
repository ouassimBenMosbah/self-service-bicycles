import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, tap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { MyArrayUtils } from 'src/app/shared/utils/array';
import { MyStringUtils } from 'src/app/shared/utils/string';
import { INITIAL_STATIONS_SORT_VALUE } from '../../constants/stations-sort.constant';
import { StationsFilterer } from '../../interfaces/stations-filters.interface';
import { StationsSort } from '../../interfaces/stations-sort.interface';
import { StationsListService } from '../../services/stations-list.service';
import { MatDialog } from '@angular/material/dialog';
import { StationInformationSheetComponent } from 'src/app/features/station-detail/components/station-information-sheet/station-information-sheet.component';
import { ViewStationDetailComponent } from 'src/app/features/station-detail/containers/view-station-detail/view-station-detail.component';

type AscIcon = 'north';
type DescIcon = 'south';

const ASC_ICON = 'north';
const DESC_ICON = 'south';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit, AfterViewInit {
  public stations$!: Observable<Station[]>;
  public lastStationsUpdate: Date = new Date();
  public favoriteStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public standardStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public clientPosition$!: Observable<google.maps.LatLngLiteral>;
  public favoriteStationsIds: string[] = [];
  public viewId: 1 | 2 = 1;

  private filterChanges$: BehaviorSubject<StationsFilterer[]> = new BehaviorSubject<StationsFilterer[]>([]);
  private stationsSort$: BehaviorSubject<StationsSort> = new BehaviorSubject(INITIAL_STATIONS_SORT_VALUE);

  constructor(
    private clientPositionService: ClientPositionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private stationsDatastoreService: StationsDatastoreService,
    private stationsListService: StationsListService
  ) {}

  public ngOnInit(): void {
    this.clientPosition$ = this.clientPositionService.getClientPosition().pipe(shareReplay(1));

    this.stations$ = this.getFilteredStations();
  }

  public ngAfterViewInit(): void {
    const selectedIndex: number | undefined = this.route.snapshot.queryParams?.tab;
    if (selectedIndex !== undefined) {
      this.viewId = +selectedIndex as 1 | 2;
    }
  }

  private getFilteredStations(): Observable<Station[]> {
    return combineLatest([
      this.stationsListService.stations,
      this.stationsListService.favoriteStations.pipe(
        tap(stations => {
          this.favoriteStationsIds = stations.map(({ station_id }) => station_id);
        }),
        debounceTime(0)
      ),
      this.filterChanges$.asObservable(),
      this.stationsSort$.asObservable(),
    ]).pipe(
      map(([standard, favorite, stationsFilterers, stationsSort]) => {
        this.setSortIcons(stationsSort);

        const allStations = this.stationsListService.filterStations(standard.concat(favorite), stationsFilterers);

        return MyArrayUtils.sortObjectsByKey(
          allStations,
          'name',
          stationsSort.favoriteStationsSortAsc ? MyStringUtils.compareStringsAsc : MyStringUtils.compareStringsDesc
        );
      })
    );
  }

  private setSortIcons(stationsSort: StationsSort): void {
    this.favoriteStationsSortIcon = stationsSort.favoriteStationsSortAsc ? ASC_ICON : DESC_ICON;
    this.standardStationsSortIcon = stationsSort.standardStationsSortAsc ? ASC_ICON : DESC_ICON;
  }

  public onFilterChanges(stationsFilterer: StationsFilterer[]): void {
    this.filterChanges$.next(stationsFilterer);
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }

  public onStationClick(station: Station): void {
    this.dialog.open(ViewStationDetailComponent, { data: { station }, width: '863px', height: '528px' });
  }

  public onToggleSort(typeStations: 'favorite' | 'standard'): void {
    const sortValue = this.stationsSort$.getValue();
    this.stationsSort$.next({
      standardStationsSortAsc: typeStations === 'standard' ? !sortValue.standardStationsSortAsc : sortValue.standardStationsSortAsc,
      favoriteStationsSortAsc: typeStations === 'favorite' ? !sortValue.favoriteStationsSortAsc : sortValue.favoriteStationsSortAsc,
    });
  }

  public onToggleView(): void {
    this.viewId = this.viewId === 1 ? 2 : 1;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { tab: this.viewId } });
  }
}
