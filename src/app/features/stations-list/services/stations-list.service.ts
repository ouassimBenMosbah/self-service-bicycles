import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { StationsFilterer } from '../interfaces/stations-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class StationsListService {
  public stations: Observable<Station[]> = this.stationsDatastore.stations;
  public favoriteStations: Observable<Station[]> = this.stationsDatastore.favoriteStations;

  constructor(private stationsDatastore: StationsDatastoreService) {}

  public filterStations(stations: Station[], stationsFilterers: StationsFilterer[]): Station[] {
    return stations.filter(station => {
      return stationsFilterers.every(filterer => filterer(station));
    });
  }
}
