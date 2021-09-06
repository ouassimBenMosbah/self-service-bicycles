import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { sortObjectsByKey } from 'src/app/shared/utils/array';
import { isContaining } from 'src/app/shared/utils/string';
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

  public filterStations(stations: Station[], stationsFilters: StationsFilters, clientPosition: google.maps.LatLngLiteral): Station[] {
    let resStations: Station[] = stations.concat();

    resStations = sortObjectsByKey(resStations, 'name');

    if (stationsFilters.stationName.length > 0) {
      resStations = resStations.filter(station => isContaining(station.name, stationsFilters.stationName));
    }

    if (stationsFilters.someBikesAvailable) {
      resStations = resStations.filter((station: Station) => station.num_bikes_available > 0);
    }

    if (stationsFilters.someFreeDocksAvailable) {
      resStations = resStations.filter((station: Station) => station.num_docks_available > 0);
    }

    if (stationsFilters.isNearMe) {
      resStations = resStations.filter((station: Station) => this.isStationNearClient(station, clientPosition));
    }

    return resStations;
  }

  private isStationNearClient(station: Station, clientPosition: google.maps.LatLngLiteral): boolean {
    return (
      !!station.lat &&
      !!station.lon &&
      !!clientPosition.lat &&
      !!clientPosition.lng &&
      this.getDistanceFromLatLonInKm(station.lat, station.lon, clientPosition.lat, clientPosition.lng) < 1.5
    );
  }

  private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat: number = this.degToRadius(lat2 - lat1);
    const dLon: number = this.degToRadius(lon2 - lon1);
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRadius(lat1)) * Math.cos(this.degToRadius(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm: number = R * c;
    return distanceInKm;
  }

  private degToRadius(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
