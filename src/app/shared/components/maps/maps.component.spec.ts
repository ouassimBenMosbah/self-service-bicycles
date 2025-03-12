import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { SafeHtmlModule } from '../../pipes/safe-html/safe-html.module';
import { MapsComponent } from './maps.component';

// Mock Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async () => {
    // Mock Google Maps global variable
    window.google = {
      maps: {
        Map: class {},
        Marker: class {},
        InfoWindow: class {},
        LatLng: class {},
      },
    };

    await TestBed.configureTestingModule({
      declarations: [MapsComponent],
      imports: [SafeHtmlModule, GoogleMapsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open info window when openInfo is called', () => {
    const markerMock = { getPosition: () => ({ lat: 48.8588443, lng: 2.2943506 }) } as unknown as MapMarker;
    const infoContentMock = 'Info content';

    spyOn(component.infoWindow, 'open');

    component.openInfo(markerMock, infoContentMock);

    expect(component.infoWindow.open).toHaveBeenCalledWith(markerMock);
    expect(component.infoContent).toBe(infoContentMock);
  });
});
