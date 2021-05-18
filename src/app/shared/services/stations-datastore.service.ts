import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GbfsApiService } from 'src/app/core/gbfs-api/services/gbfs-api.service';
import { StationInformation } from 'src/app/core/interfaces/station-information.interface';
import { StationStatus } from 'src/app/core/interfaces/station-status.interface';
import { Station } from 'src/app/core/interfaces/station.interface';

@Injectable({
  providedIn: 'root',
})
export class StationsDatastoreService {
  private stations$: BehaviorSubject<Station[]> = new BehaviorSubject<
    Station[]
  >([]);

  constructor(private gbfsApiService: GbfsApiService) {}

  /**
   * getStations
   */
  public getStations(): Observable<Station[]> {
    return this.stations$.asObservable();
  }

  public fetchStationsData(): Observable<Station[]> {
    return forkJoin([
      this.gbfsApiService.getStationInformation(),
      this.gbfsApiService.getStationStatus(),
    ]).pipe(
      map(
        ([stationsInformation, stationsStatus]: [
          StationInformation[],
          StationStatus[]
        ]) => {
          if (stationsInformation.length === stationsStatus.length) {
            const nbStations: number = stationsInformation.length;
            let stations: Record<string, Station> = {};
            for (let i = 0; i < nbStations; i++) {
              const currStationInformation: StationInformation =
                stationsInformation[i];
              const currStationStatus: StationStatus = stationsStatus[i];

              stations = this.addElementToStationRecord(
                stations,
                currStationInformation
              );

              stations = this.addElementToStationRecord(
                stations,
                currStationStatus
              );
            }
            return Object.values(stations);
          }
          throw new Error('Missing stations data');
        }
      ),
      tap((stations: Station[]) => {
        this.stations$.next(stations);
      })
    );
  }

  private addElementToStationRecord<T extends { station_id: string }>(
    record: Record<string, T>,
    element: Partial<T>
  ): Record<string, T> {
    return {
      ...record,
      [(element as T).station_id]: {
        ...record[(element as T).station_id],
        ...element,
      },
    };
  }
}
