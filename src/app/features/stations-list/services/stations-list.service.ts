import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from 'src/app/shared/interfaces/splitted-stations.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { sortObjectsByKey } from 'src/app/shared/utils/array';
import { isContaining } from 'src/app/shared/utils/string';
import { StationsFilterer, StationsFilters } from '../interfaces/stations-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class StationsListService {
  public stations = this.stationsDatastore.stations;
  public favoriteStations = this.stationsDatastore.favoriteStations;
  constructor(private stationsDatastore: StationsDatastoreService) {}

  public getStations(): Observable<Station[]> {
    return this.stationsDatastore.getAllStations();
  }

  public filterStations(stations: Station[], stationsFilterers: StationsFilterer[], clientPosition: google.maps.LatLngLiteral): Station[] {
    stations = sortObjectsByKey(stations, 'name');

    if (stationsFilterers.length === 0) {
      return stations;
    }

    return stations.filter(station => {
      return stationsFilterers.some(filterer => filterer(station));
    });
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
