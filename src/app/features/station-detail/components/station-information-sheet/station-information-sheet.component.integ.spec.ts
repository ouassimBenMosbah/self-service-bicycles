import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Station } from 'src/app/core/interfaces/station.interface';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { StationInformationSheetComponent } from './station-information-sheet.component';

describe('StationInformationSheetComponent', () => {
  let spectator: Spectator<StationInformationSheetComponent>;

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

  const createComponent = createComponentFactory({
    component: StationInformationSheetComponent,
    declarations: [IconComponent, LoaderComponent],
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display loader till the station data are not fetched', () => {
    expect(spectator.query('.station-detail')).toBe(null);
    expect(spectator.query('app-loader')).toBeTruthy();
  });

  it('should display the station informations when data are fetched', () => {
    spectator.setInput({ station });
    expect(spectator.query('app-loader')).toBeFalsy();
    expect(spectator.query('.station-detail')).toHaveText(station.name);
  });

  it('should update station informations after data changes', () => {
    const bikesAvailableUpdated: number = station.num_bikes_available + 2;

    spectator.setInput({ station });
    expect(spectator.query('.station-detail__info')).not.toHaveText(`${bikesAvailableUpdated} bikes available`);

    spectator.setInput({ station: { ...station, num_bikes_available: bikesAvailableUpdated } });
    expect(spectator.query('.station-detail__info')).toHaveText(`${bikesAvailableUpdated} bikes available`);
  });
});
