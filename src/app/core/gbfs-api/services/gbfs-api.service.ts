import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StationInformation } from '../../interfaces/station-information.interface';

@Injectable({
  providedIn: 'root',
})
export class GbfsApiService {
  constructor(private http: HttpClient) {}

  public getStationInformation(): Observable<StationInformation[]> {
    return this.http
      .jsonp(`${environment.apiUrl}/station_information.json`, 'callback')
      .pipe(
        map((res) => res as any)
        // tap(console.log),
        // map(({ data }: StationInformationDTO) => data.stations),
        // catchError(this.errorHandler)
      );
  }

  // public getStationStatus(): Observable<StationStatus[]> {
  //   return this.http
  //     .get<StationStatusDTO>(`${environment.apiUrl}/station_status.json`)
  //     .pipe(
  //       map(({ data }: StationStatusDTO) => data.stations),
  //       catchError(this.errorHandler)
  //     );
  // }

  private errorHandler = (error: HttpErrorResponse): Observable<never> => {
    // TODO: Handle errors based on status
    // A specific service should do this job
    alert(error.statusText);
    return throwError(error.statusText);
  };
}
