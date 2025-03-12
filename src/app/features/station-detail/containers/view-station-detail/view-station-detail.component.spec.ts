import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { ViewStationDetailComponent } from './view-station-detail.component';

describe('ViewStationDetailComponent - unit test', () => {
  let component: ViewStationDetailComponent;
  let fixture: ComponentFixture<ViewStationDetailComponent>;
  let stationsDatastoreService: StationsDatastoreService;

  const station: Station = {
    station_id: 'test-station',
    name: 'Test Station',
    lat: 0,
    lon: 0,
    capacity: 12,
    status: 'IN_SERVICE',
    num_bikes_available: 3,
    num_bikes_disabled: 0,
    num_docks_available: 14,
    updatedAt: new Date(2021, 1, 1),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      declarations: [ViewStationDetailComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { station } },
        {
          provide: StationsDatastoreService,
          useValue: {
            toggleFavoriteStation: () => {},
            getOneStation: () => of(station),
            getFavoriteStations: () => of([]),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStationDetailComponent);
    component = fixture.componentInstance;
    stationsDatastoreService = TestBed.inject(StationsDatastoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggle favorite station when event emitted', () => {
    spyOn(stationsDatastoreService, 'toggleFavoriteStation');
    component.onToggleFavorite('test-station');
    expect(stationsDatastoreService.toggleFavoriteStation).toHaveBeenCalled();
  });
});
