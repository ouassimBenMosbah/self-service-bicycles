import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { createRoutingFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ClientPositionService } from 'src/app/shared/services/client-position.service';
import { StationDetailService } from '../../services/station-detail.service';
import { ViewStationDetailComponent } from './view-station-detail.component';

describe('ViewStationDetailComponent - integration test', () => {
  let spectator: Spectator<ViewStationDetailComponent>;

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
    num_docks_available: 14,
    updatedAt: new Date(2021, 1, 1),
  };

  const createComponent = createRoutingFactory({
    component: ViewStationDetailComponent,
    imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
    declarations: [LoaderComponent],
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: { station } },
      {
        provide: ClientPositionService,
        useValue: { getClientPosition: () => of(null) },
      },
      { provide: StationDetailService, useValue: { getOneStation: () => of(station), isFavoriteStation: () => of(true) } },
    ],
    params: { id: 'test-station' },
    schemas: [NO_ERRORS_SCHEMA],
  });
  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show station when data retrieved', async () => {
    expect(spectator.query('app-station-information-sheet')).toHaveLength(1);
    expect(spectator.query('app-maps')).toHaveLength(1);
  });
});
