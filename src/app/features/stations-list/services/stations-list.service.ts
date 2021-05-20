import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { sortObjectsByKey } from 'src/app/shared/utils/array';
import { StationsFilters } from '../interfaces/stations-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class StationsListService {
  constructor(private stationsDatastore: StationsDatastoreService) {}

  public getStations(): Observable<Station[]> {
    return this.stationsDatastore.getAllStations();
  }

  public getSplittedStations(): Observable<SplittedStations> {
    return this.stationsDatastore.getSplittedStations();
  }

  public filterStations(
    stations: Station[],
    stationsFilters: StationsFilters
  ): Station[] {
    let resStations: Station[] = stations.concat();

    resStations = sortObjectsByKey(resStations, 'name');

    if (!stationsFilters.orderByName) {
      resStations = resStations.reverse();
    }

    if (stationsFilters.someBikesAvailable) {
      resStations = resStations.filter(
        (station: Station) => station.num_bikes_available > 0
      );
    }

    if (stationsFilters.someFreeDocksAvailable) {
      resStations = resStations.filter(
        (station: Station) => station.num_docks_available > 0
      );
    }

    return resStations;
  }
}
