import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Station } from 'src/app/core/interfaces/station.interface';
import { sortObjectsByKey } from 'src/app/shared/utils/array';
import { StationsListService } from '../../services/stations-list.service';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStationsListComponent implements OnInit {
  public stations$!: Observable<Station[]>;

  constructor(private stationsListService: StationsListService) {}

  public ngOnInit(): void {
    this.stations$ = this.stationsListService
      .getStations()
      .pipe(map((stations: Station[]) => sortObjectsByKey(stations, 'name')));
  }
}
