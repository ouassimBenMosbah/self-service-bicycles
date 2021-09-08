import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { StationDetailService } from '../../services/station-detail.service';

@Component({
  selector: 'app-view-station-detail',
  templateUrl: './view-station-detail.component.html',
  styleUrls: ['./view-station-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationDetailComponent implements OnInit, OnDestroy {
  public station$!: Observable<Station>;
  public isFavoriteStation$!: Observable<boolean>;
  public clientPosition!: google.maps.LatLngLiteral;

  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stationDetailService: StationDetailService,
    private stationsDatastoreService: StationsDatastoreService,
    private clientPositionService: ClientPositionService
  ) {}

  public ngOnInit(): void {
    const clientPosSubscription: Subscription = this.clientPositionService
      .getClientPosition()
      .subscribe((clientPosition: google.maps.LatLngLiteral) => {
        this.clientPosition = clientPosition;
      });
    this.subscription.add(clientPosSubscription);

    this.station$ = this.getStationObservableFromRouteParam();

    this.isFavoriteStation$ = this.getIsFavoriteStationObservable();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getStationObservableFromRouteParam(): Observable<Station> {
    return this.route.params.pipe(
      switchMap((params: Params) => {
        return this.stationDetailService.getOneStation(params.id);
      })
    );
  }

  private getIsFavoriteStationObservable(): Observable<boolean> {
    return this.station$.pipe(
      switchMap(({ station_id }: Station) => {
        return this.stationDetailService.isFavoriteStation(station_id);
      }),
      distinctUntilChanged()
    );
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }

  public back(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
