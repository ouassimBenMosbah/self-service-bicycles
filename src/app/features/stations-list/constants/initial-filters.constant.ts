import { StationsFilters } from '../interfaces/stations-filters.interface';

export const INITIAL_STATIONS_FILTERS_VALUE: StationsFilters = {
  stationName: '',
  isFavorite: false,
  someBikesAvailable: false,
  someFreeDocksAvailable: false,
  isNearMe: false,
};
