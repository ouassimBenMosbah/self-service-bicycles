import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Station } from 'src/app/core/interfaces/station.interface';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

import { StationInformationSheetComponent } from './station-information-sheet.component';

export class MockTestService {}
describe('StationInformationSheetComponent', () => {
  let component: StationInformationSheetComponent;
  let fixture: ComponentFixture<StationInformationSheetComponent>;
  const station: Station = {
    station_id: 'test-station',
    name: 'Test Station',
    lat: 0,
    lon: 0,
    capacity: 12,
    is_installed: true,
    is_renting: true,
    is_returning: false,
    last_reported: 1,
    num_bikes_available: 3,
    num_bikes_disabled: 0,
    num_docks_available: 12,
    updatedAt: new Date(2021, 1, 1),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StationInformationSheetComponent,
        IconComponent,
      ],
    });
    fixture = TestBed.createComponent(StationInformationSheetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Properties', () => {
    it('should display nothing when there is no station', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.station-detail'))).toBeNull();
    });

    it('should display station name', () => {
      component.station = station;
      component.ngOnChanges({
        station: new SimpleChange(undefined, station, true)
      });
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.station-detail__name')).nativeElement.textContent).toEqual('Test Station');
    });
  });
});
