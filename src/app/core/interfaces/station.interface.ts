import { StationInformation } from './station-information.interface';
import { StationStatus } from './station-status.interface';

export interface Station extends StationInformation, StationStatus {}
