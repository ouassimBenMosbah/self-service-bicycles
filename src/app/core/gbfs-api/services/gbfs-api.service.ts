import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StationInformation } from '../../interfaces/station-information.interface';
import { StationStatus } from '../../interfaces/station-status.interface';
import { StationInformationDTO } from '../types/station-information.dto';
import { StationStatusDTO } from '../types/station-status.dto';

@Injectable({
  providedIn: 'root',
})
export class GbfsApiService {
  constructor(private http: HttpClient) {}

  public getStationInformation(): Observable<StationInformation[]> {
    return this.http
      .get<StationInformationDTO>(
        `${environment.apiUrl}/station_information.json`
      )
      .pipe(
        map(({ data }: StationInformationDTO) => data.stations),
        catchError(this.errorHandler)
      );
  }

  public getStationStatus(): Observable<StationStatus[]> {
    return this.http
      .get<StationStatusDTO>(`${environment.apiUrl}/station_status.json`)
      .pipe(
        map(({ data }: StationStatusDTO) => data.stations),
        catchError(this.errorHandler)
      );
  }

  private errorHandler = (error: HttpErrorResponse): Observable<never> => {
    // TODO: Handle errors based on status
    // A specific service should do this job
    alert(error.statusText);
    return throwError(error.statusText);
  };
}
