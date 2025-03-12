// More Information can be found here:
// https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_statusjson

import { StationStatus } from '../../interfaces/station-status.interface';

export interface StationStatusDTO {
  total_count: number;
  results: StationStatus[];
}
