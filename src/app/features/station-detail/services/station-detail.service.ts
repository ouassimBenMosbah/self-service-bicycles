import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';

@Injectable({
  providedIn: 'root',
})
export class StationDetailService {
  constructor(private stationsDatastore: StationsDatastoreService) {}

  public getOneStation(stationId: string): Observable<Station> {
    return this.stationsDatastore.getOneStation(stationId);
  }
}
