import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { GbfsApiService } from 'src/app/core/gbfs-api/services/gbfs-api.service';
import { StationInformation } from 'src/app/core/interfaces/station-information.interface';
import { StationStatus } from 'src/app/core/interfaces/station-status.interface';
import { Station } from 'src/app/core/interfaces/station.interface';
import { SplittedStations } from '../interfaces/splitted-stations.interface';
import { difference } from '../utils/array';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StationsDatastoreService {
  private stations$: BehaviorSubject<Record<string, Station>> = new BehaviorSubject({});

  private favoriteStations$: BehaviorSubject<string[]> = new BehaviorSubject(new Array<string>());

  constructor(private gbfsApiService: GbfsApiService, private localStorageService: LocalStorageService) {}

  public setFavoriteStations(stationsIds: string[]): void {
    this.favoriteStations$.next(stationsIds);
  }

  public toggleFavoriteStation(stationId: string): void {
    const favoriteStations: string[] = this.favoriteStations$.getValue();
    const stationIndex: number = favoriteStations.findIndex((id: string) => id === stationId);
    let newFavoriteStations: string[];
    if (stationIndex === -1) {
      newFavoriteStations = favoriteStations.concat(stationId);
    } else {
      newFavoriteStations = favoriteStations.filter((_s, i) => i !== stationIndex);
    }
    this.localStorageService.setLocalData('favoriteStations', JSON.stringify(newFavoriteStations));
    this.setFavoriteStations(newFavoriteStations);
  }

  public getAllStations(): Observable<Station[]> {
    return this.stations$.pipe(map((recordStations: Record<string, Station>) => Object.values(recordStations)));
  }

  public getFavoriteStations(): Observable<string[]> {
    return this.favoriteStations$.asObservable();
  }

  public getSplittedStations(): Observable<SplittedStations> {
    return combineLatest([this.stations$, this.favoriteStations$]).pipe(
      map(([stations, favoriteStationsId]: [Record<string, Station>, string[]]) => {
        const standardStationId: string[] = difference(Object.keys(stations), favoriteStationsId);
        return {
          favorite: favoriteStationsId.map((id: string) => stations[id]).filter(station => !!station),
          standard: standardStationId.map((id: string) => stations[id]),
        };
      })
    );
  }

  public getOneStation(stationId: string): Observable<Station> {
    return this.getAllStations().pipe(
      filter((stations: Station[]) => stations.length > 0),
      map((stations: Station[]) => {
        const stationIndex: number = stations.findIndex((s: Station) => s.station_id === stationId);
        if (stationIndex > -1) {
          return stations[stationIndex];
        }
        throw new Error(`Could not find the station: ${stationId}`);
      })
    );
  }

  public fetchStationsData(): Observable<Record<string, Station>> {
    return forkJoin([this.gbfsApiService.getStationInformation(), this.gbfsApiService.getStationStatus()]).pipe(
      map(([stationsInformation, stationsStatus]: [StationInformation[], StationStatus[]]) => {
        if (stationsInformation.length === stationsStatus.length) {
          const nbStations: number = stationsInformation.length;
          let stations: Record<string, Station> = {};
          for (let i = 0; i < nbStations; i++) {
            const currStationInformation: StationInformation = stationsInformation[i];
            const currStationStatus: StationStatus = stationsStatus[i];

            stations = this.addElementToStationRecord(stations, currStationInformation);

            stations = this.addElementToStationRecord(stations, {
              ...currStationStatus,
              updatedAt: new Date(),
            });
          }
          return stations;
        }
        throw new Error('Missing stations data');
      }),
      tap((stations: Record<string, Station>) => {
        this.stations$.next(stations);
      })
    );
  }

  private addElementToStationRecord<T extends { station_id: string }>(record: Record<string, T>, element: Partial<T>): Record<string, T> {
    return {
      ...record,
      [(element as T).station_id]: {
        ...record[(element as T).station_id],
        ...element,
      },
    };
  }
}
