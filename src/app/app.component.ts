import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, repeat } from 'rxjs/operators';
import { StationsDatastoreService } from './shared/services/stations-datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private stationsDatastore: StationsDatastoreService) {}

  public ngOnInit(): void {
    const ONE_MINUTE_IN_MS = 60 * 1000;
    this.stationsDatastore.fetchStationsData().pipe(delay(ONE_MINUTE_IN_MS), repeat()).subscribe();
  }
}
