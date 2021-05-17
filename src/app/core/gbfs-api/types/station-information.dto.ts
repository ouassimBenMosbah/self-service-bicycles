// More Informations can be found here:
// https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_informationjson

import { StationInformation } from '../../interfaces/station-information.interface';

export interface StationInformationDTO {
  last_updated: Date;
  ttl: number; // Number of seconds before the data in the feed will be updated again (0 if the data should always be refreshed).
  data: StationInformationDTOData;
}

interface StationInformationDTOData {
  stations: StationInformation[];
}
