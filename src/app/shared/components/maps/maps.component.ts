import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() stationsToMark: Station[] = [];
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  zoom = 13;
  center!: google.maps.LatLngLiteral;
  markers: (Partial<MapMarker> & { info: any })[] = [];
  infoContent: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.setMarkers(this.stationsToMark);

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.cdr.markForCheck();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.stationsToMark) {
      this.setMarkers(changes.stationsToMark.currentValue);
    }
  }

  private setMarkers(newStations: Station[]) {
    this.markers = newStations.map((station) => {
      return {
        position: { lat: station.lat, lng: station.lon },
        info: this.getInfoTemplate(station),
      };
    });
  }

  public openInfo(marker: MapMarker, infoContent: any) {
    this.infoContent = infoContent;
    this.infoWindow.open(marker);
  }

  private getInfoTemplate(station: Station): string {
    return `
      <h1>${station.name}</h1>
      <div>
        <p>Bikes available : <b>${station.num_bikes_available}</b></p>
        <p>Docks available : <b>${station.num_docks_available}</b></p>
        <p>Out of service : <b>${
          station.capacity -
          station.num_bikes_available -
          station.num_docks_available
        }</b></p>
      </div>
    `;
  }
}
