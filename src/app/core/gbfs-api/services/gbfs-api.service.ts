import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
    return this.http.get<StationInformationDTO>(`${environment.apiUrl}/station_information.json`).pipe(
      map(({ data: { stations } }: StationInformationDTO) => stations),
      catchError(this.errorHandler)
    );
  }

  public getStationStatus(): Observable<StationStatus[]> {
    return this.http.get<StationStatusDTO>(`${environment.apiUrl}/station_status.json`).pipe(
      map(({ data: { stations } }: StationStatusDTO) =>
        stations.map(s => ({
          ...s,
          is_installed: !!s.is_installed,
          is_renting: !!s.is_renting,
          is_returning: !!s.is_returning,
        }))
      ),
      catchError(this.errorHandler)
    );
  }

  private errorHandler = (error: HttpErrorResponse): Observable<never> => {
    // TODO: Handle errors based on status
    // A specific service should do this job
    let message = error.statusText;

    if (error.status === 503) {
      message = 'Service unavailable. Please try again later';
    }

    // alert(message);
    return throwError(error.statusText);
  };
}
