import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationInformationSheetComponent } from './station-information-sheet.component';

describe('Integ: StationInformationSheetComponent', () => {
  let spectator: Spectator<StationInformationSheetComponent>;
  let station: Station = {
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

  const createComponent = createComponentFactory(StationInformationSheetComponent);

  beforeEach(() => spectator = createComponent());

  describe('Properties', () => {
    it('should display the station name', () => {
      spectator.setInput('station', station);
      expect(spectator.query('.station-detail__name')).toHaveText('Test Station');
    });
  });
});
