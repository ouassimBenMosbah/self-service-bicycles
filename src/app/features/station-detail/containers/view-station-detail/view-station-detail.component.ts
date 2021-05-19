import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationDetailService } from '../../services/station-detail.service';

@Component({
  selector: 'app-view-station-detail',
  templateUrl: './view-station-detail.component.html',
  styleUrls: ['./view-station-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationDetailComponent implements OnInit {
  public station$!: Observable<Station>;

  constructor(
    private route: ActivatedRoute,
    private stationDetailService: StationDetailService
  ) {}

  public ngOnInit(): void {
    this.station$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.stationDetailService.getOneStation(params.id);
      })
    );
  }
}
