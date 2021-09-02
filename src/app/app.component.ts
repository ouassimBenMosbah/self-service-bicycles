import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, repeat } from 'rxjs/operators';
import { FAVORITE_STATIONS_LOCAL_STORAGE_KEY } from './features/stations-list/constants/favorite-stations-local-storage-key.constant';
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
      typeof this.localStorageService.getLocalData(FAVORITE_STATIONS_LOCAL_STORAGE_KEY) === 'string'
        ? JSON.parse(this.localStorageService.getLocalData(FAVORITE_STATIONS_LOCAL_STORAGE_KEY) as string)
        : [];

    this.stationsDatastore.setFavoriteStations(favoriteStations);
  }
}
