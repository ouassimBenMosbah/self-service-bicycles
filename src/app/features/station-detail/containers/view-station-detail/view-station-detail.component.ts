import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { StationDetailService } from '../../services/station-detail.service';

@Component({
  selector: 'app-view-station-detail',
  templateUrl: './view-station-detail.component.html',
  styleUrls: ['./view-station-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationDetailComponent implements OnInit {
  public station$!: Observable<Station>;
  public isFavoriteStation$!: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stationDetailService: StationDetailService,
    private stationsDatastoreService: StationsDatastoreService
  ) {}

  public ngOnInit(): void {
    this.station$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.stationDetailService.getOneStation(params.id);
      })
    );

    this.isFavoriteStation$ = this.station$.pipe(
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
