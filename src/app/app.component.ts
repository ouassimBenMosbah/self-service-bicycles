import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, repeat } from 'rxjs/operators';
import { LocalStorageService } from './shared/services/local-storage.service';
import { StationsDatastoreService } from './shared/services/stations-datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private stationsDatastore: StationsDatastoreService, private localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
    const ONE_MINUTE_IN_MS = 60 * 1000;
    this.stationsDatastore.fetchStationsData().pipe(delay(ONE_MINUTE_IN_MS), repeat()).subscribe();

    const favoriteStations =
      typeof this.localStorageService.getLocalData('favoriteStations') === 'string'
        ? JSON.parse(this.localStorageService.getLocalData('favoriteStations') as string)
        : [];

    this.stationsDatastore.setFavoriteStations(favoriteStations);
  }
}
