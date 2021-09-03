import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { delay, repeat, tap } from 'rxjs/operators';

const CLERMONT_GEO_LOCATION: google.maps.LatLngLiteral = { lat: 45.7799939, lng: 3.0707623 };

@Injectable({
  providedIn: 'root',
})
export class ClientPositionService {
  private clientPosition$: BehaviorSubject<google.maps.LatLngLiteral> = new BehaviorSubject(CLERMONT_GEO_LOCATION);

  constructor() {
    const ONE_MINUTE_IN_MS = 60 * 1000;
    of(null)
      .pipe(
        tap(() => {
          this.setClientPosition();
        }),
        delay(ONE_MINUTE_IN_MS),
        repeat()
      )
      .subscribe();
  }

  private setClientPosition(): void {
    navigator.geolocation.getCurrentPosition(this.succesGetCurrentPosition, this.errorGetCurrentPosition);
  }

  private succesGetCurrentPosition = (position: GeolocationPosition) => {
    this.clientPosition$.next({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  private errorGetCurrentPosition = () => {
    this.clientPosition$.next(CLERMONT_GEO_LOCATION);
  };

  public getClientPosition(): Observable<google.maps.LatLngLiteral> {
    return this.clientPosition$.asObservable();
  }
}
