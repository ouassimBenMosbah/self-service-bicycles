// More Information can be found here:
// https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_informationjson

import { StationInformation } from '../../interfaces/station-information.interface';

export interface StationInformationDTO {
  total_count: number;
  results: StationInformation[];
}
