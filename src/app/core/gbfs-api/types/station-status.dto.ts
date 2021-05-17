// More Informations can be found here:
// https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_statusjson

import { StationStatus } from '../../interfaces/station-status.interface';

export interface StationStatusDTO {
  last_updated: Date;
  ttl: number; // Number of seconds before the data in the feed will be updated again (0 if the data should always be refreshed).
  data: StationStatusDTOData;
}

interface StationStatusDTOData {
  stations: StationStatus[];
}
