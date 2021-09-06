import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilterer, StationsFilters } from '../../interfaces/stations-filters.interface';
import { StationsListService } from '../../services/stations-list.service';

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
export class ViewStationsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listTab', { static: false }) listTab!: MatTabGroup;

  public stations$!: Observable<SplittedStations>;
  public allStations$!: Observable<Station[]>;
  public lastStationsUpdate: Date = new Date();
  public isAnyFavorite = false;
  public favoriteStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public standardStationsSortIcon: DescIcon | AscIcon = ASC_ICON;
  public clientPosition!: google.maps.LatLngLiteral;

  private subscription: Subscription = new Subscription();
  private filterChanges$: BehaviorSubject<StationsFilterer[]> = new BehaviorSubject<StationsFilterer[]>([]);

  constructor(
    private stationsListService: StationsListService,
    private stationsDatastoreService: StationsDatastoreService,
    private clientPositionService: ClientPositionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const clientPosSubscription: Subscription = this.clientPositionService
      .getClientPosition()
      .subscribe((clientPosition: google.maps.LatLngLiteral) => {
        this.clientPosition = clientPosition;
      });
    this.subscription.add(clientPosSubscription);

    this.stations$ = this.getFilteredStations();
    this.allStations$ = this.getStationsObservable();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    ]).pipe(
      map(([standard, favorite, stationsFilterers]) => {
        this.isAnyFavorite = favorite.length > 0;

        // this.setSortIcons(stationsFilterers);

        const favoriteStations: Station[] = this.stationsListService.filterStations(favorite, stationsFilterers, this.clientPosition);
        const standardStations: Station[] = this.stationsListService.filterStations(standard, stationsFilterers, this.clientPosition);

        return {
          favorite: /* stationsFilterers.favoriteStationsSortAsc ?  */ favoriteStations /* : favoriteStations.reverse() */,
          standard: /* stationsFilterers.standardStationsSortAsc ?  */ standardStations /* : standardStations.reverse() */,
        };
      })
    );
  }

  private setSortIcons(stationsFilters: StationsFilters): void {
    this.favoriteStationsSortIcon = stationsFilters.favoriteStationsSortAsc ? ASC_ICON : DESC_ICON;
    this.standardStationsSortIcon = stationsFilters.standardStationsSortAsc ? ASC_ICON : DESC_ICON;
  }

  public onSelectedTabChange({ index }: MatTabChangeEvent): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { tab: index } });
  }

  public onFilterChanges(stationsFilterer: StationsFilterer[]): void {
    this.filterChanges$.next(stationsFilterer);
    // favoriteStationsSortAsc: this.favoriteStationsSortIcon === ASC_ICON,
    // standardStationsSortAsc: this.standardStationsSortIcon === ASC_ICON,
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }

  public onStationClick(stationId: string): void {
    this.router.navigate([stationId], { relativeTo: this.route });
  }

  public onToggleSort(typeStations: 'favorite' | 'standard'): void {
    /*     const filterValue = this.filterChanges$.getValue();
    this.filterChanges$.next({
      ...filterValue,
      standardStationsSortAsc: typeStations === 'standard' ? !filterValue.standardStationsSortAsc : filterValue.standardStationsSortAsc,
      favoriteStationsSortAsc: typeStations === 'favorite' ? !filterValue.favoriteStationsSortAsc : filterValue.favoriteStationsSortAsc,
    }); */
  }
}
