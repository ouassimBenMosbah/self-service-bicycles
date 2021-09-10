import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { GbfsApiService } from 'src/app/core/gbfs-api/services/gbfs-api.service';
import { StationInformation } from 'src/app/core/interfaces/station-information.interface';
import { StationStatus } from 'src/app/core/interfaces/station-status.interface';
import { Station } from 'src/app/core/interfaces/station.interface';
import { FAVORITE_STATIONS_LOCAL_STORAGE_KEY } from 'src/app/features/stations-list/constants/favorite-stations-local-storage-key.constant';
import { MyArrayUtils } from '../utils/array';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StationsDatastoreService {
  private stations$: BehaviorSubject<Record<string, Station>> = new BehaviorSubject({});

  private favoriteStations$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public stations = combineLatest([this.stations$, this.favoriteStations$]).pipe(
    map(([stations, favoriteStationsId]: [Record<string, Station>, string[]]) => {
      const standardStationId: string[] = MyArrayUtils.difference(Object.keys(stations), favoriteStationsId);
      return standardStationId.map((id: string) => stations[id]);
    })
  );

  public favoriteStations = combineLatest([this.stations$, this.favoriteStations$]).pipe(
    map(([stations, favoriteStationsId]: [Record<string, Station>, string[]]) => {
      return favoriteStationsId.map((id: string) => stations[id]).filter(station => !!station);
    })
  );

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
    this.localStorageService.setLocalData(FAVORITE_STATIONS_LOCAL_STORAGE_KEY, JSON.stringify(newFavoriteStations));
    this.setFavoriteStations(newFavoriteStations);
  }

  public getAllStations(): Observable<Station[]> {
    return this.stations$.pipe(map((recordStations: Record<string, Station>) => Object.values(recordStations)));
  }

  public getFavoriteStations(): Observable<string[]> {
    return this.favoriteStations$.asObservable();
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
    return of({
      ['001']: {
        station_id: '001',
        name: 'Test Station 0',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: false,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['002']: {
        station_id: '002',
        name: 'Test Station 1',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['003']: {
        station_id: '003',
        name: 'Test Station 2',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['004']: {
        station_id: '004',
        name: 'Test Station 3',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['005']: {
        station_id: '005',
        name: 'Test Station 4',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['006']: {
        station_id: '006',
        name: 'Test Station 5',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['007']: {
        station_id: '007',
        name: 'Test Station 6',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['008']: {
        station_id: '008',
        name: 'Test Station 7',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['009']: {
        station_id: '009',
        name: 'Test Station 8',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['102']: {
        station_id: '102',
        name: 'Test Station 9',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['202']: {
        station_id: '202',
        name: 'Test Station 10',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['302']: {
        station_id: '302',
        name: 'Test Station 11',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['402']: {
        station_id: '402',
        name: 'Test Station 12',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['502']: {
        station_id: '502',
        name: 'Test Station 13',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['602']: {
        station_id: '602',
        name: 'Test Station 14',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['702']: {
        station_id: '702',
        name: 'Test Station 15',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['802']: {
        station_id: '802',
        name: 'Test Station 16',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['902']: {
        station_id: '902',
        name: 'Test Station 17',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
      ['012']: {
        station_id: '012',
        name: 'Test Station 18',
        lat: 0,
        lon: 0,
        capacity: 12,
        is_installed: true,
        is_renting: true,
        is_returning: false,
        last_reported: 1,
        num_bikes_available: 3,
        num_bikes_disabled: 0,
        num_docks_available: 14,
        updatedAt: new Date(2021, 1, 1),
      },
    }).pipe(
      tap((stations: Record<string, Station>) => {
        this.stations$.next(stations);
      })
    );
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
