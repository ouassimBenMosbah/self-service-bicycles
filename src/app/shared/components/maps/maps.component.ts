import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() center!: google.maps.LatLngLiteral;
  @Input() viewId!: any;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  public zoom = 14;
  public markers: (google.maps.MarkerOptions & { info: string } & any)[] = [];
  public infoContent: string = '';

  constructor() {}

  public ngOnInit(): void {
    this.setMarkers(this.stationsToMark);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.stationsToMark) {
      this.setMarkers(changes.stationsToMark.currentValue);
    }
  }

  private setMarkers(newStations: Station[]): void {
    this.markers = newStations
      .filter(({ lat, lon }) => lat !== null && lon !== null)
      .map(station => {
        return {
          position: { lat: station.lat, lng: station.lon },
          info: this.getInfoTemplate(station),
          icon: 'assets/images/icons/position.svg',
        };
      });
  }

  public openInfo(marker: MapMarker, infoContent: string) {
    this.infoContent = infoContent;
    this.infoWindow.open(marker);
  }

  private getInfoTemplate(station: Station): string {
    return `
      <h1>${station.name}</h1>
      <div style="text-align: center">
        <p><b>${station.num_bikes_available}</b> bikes available</p>
        <p><b>${station.num_docks_available}</b> docks available</p>
        <p style="color: #ef0000"><b>${
          station.capacity - station.num_bikes_available - station.num_docks_available
        }</b> docks out of service</p>
      </div>
    `;
  }
}
