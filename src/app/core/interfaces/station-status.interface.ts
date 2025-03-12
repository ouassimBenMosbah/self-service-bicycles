export interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  status: 'IN_SERVICE' | 'OUT_OF_SERVICE';
}
