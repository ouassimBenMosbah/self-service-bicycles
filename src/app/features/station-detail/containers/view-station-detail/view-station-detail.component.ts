import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { StationDetailService } from '../../services/station-detail.service';

export interface ViewStationDetailData {
  station: Station;
}

@Component({
  selector: 'app-view-station-detail',
  templateUrl: './view-station-detail.component.html',
  styleUrls: ['./view-station-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationDetailComponent implements OnInit, OnDestroy {
  public station!: Station;
  public isFavoriteStation$!: Observable<boolean>;
  public clientPosition!: google.maps.LatLngLiteral;

  private subscription: Subscription = new Subscription();

  constructor(
    private stationDetailService: StationDetailService,
    private stationsDatastoreService: StationsDatastoreService,
    private clientPositionService: ClientPositionService,
    @Inject(MAT_DIALOG_DATA) private data: ViewStationDetailData
  ) {}

  public ngOnInit(): void {
    const clientPosSubscription: Subscription = this.clientPositionService
      .getClientPosition()
      .subscribe((clientPosition: google.maps.LatLngLiteral) => {
        this.clientPosition = clientPosition;
      });
    this.subscription.add(clientPosSubscription);

    this.station = this.data.station;

    this.isFavoriteStation$ = this.getIsFavoriteStationObservable();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getIsFavoriteStationObservable(): Observable<boolean> {
    return this.stationDetailService.isFavoriteStation(this.station.station_id);
  }

  public onToggleFavorite(stationId: string): void {
    this.stationsDatastoreService.toggleFavoriteStation(stationId);
  }
}
