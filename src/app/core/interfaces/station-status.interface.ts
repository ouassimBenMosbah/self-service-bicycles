export interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  is_installed: boolean;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
}
