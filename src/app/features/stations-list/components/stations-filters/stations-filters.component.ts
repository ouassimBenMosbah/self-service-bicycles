import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { isContaining } from 'src/app/shared/utils/string';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilterer, StationsFilters } from '../../interfaces/stations-filters.interface';

@Component({
  selector: 'app-stations-filters',
  templateUrl: './stations-filters.component.html',
  styleUrls: ['./stations-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsFiltersComponent implements OnInit, OnDestroy {
  @Output() filterChanges: EventEmitter<StationsFilterer[]> = new EventEmitter();

  public filtersFormGroup!: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.filtersFormGroup = this.initializeFormGroup();
    this.emitValueChanges(this.filtersFormGroup);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeFormGroup(): FormGroup {
    return this.fb.group({ ...INITIAL_STATIONS_FILTERS_VALUE });
  }

  // if (stationsFilters.stationName.length > 0) {
  //   return isContaining(station.name, stationsFilters.stationName);
  // }

  // if (stationsFilters.someBikesAvailable) {
  //   return station.num_bikes_available > 0;
  // }

  // if (stationsFilters.someFreeDocksAvailable) {
  //   return station.num_docks_available > 0;
  // }

  // if (stationsFilters.isNearMe) {
  //   return this.isStationNearClient(station, clientPosition);
  // }
  private filterOnBikeAvailability(station: Station): boolean {
    return station.num_bikes_available > 0;
  }

  private filterOnText(text: string) {
    return (station: Station): boolean => {
      return isContaining(station.name, text);
    };
  }

  private emitValueChanges(filtersFormGroup: FormGroup): void {
    const filtersFormGroupSubscription = filtersFormGroup.valueChanges.subscribe((newValues: StationsFilters) => {
      const filterer: StationsFilterer[] = [];

      if (newValues.someBikesAvailable) {
        filterer.push(this.filterOnBikeAvailability);
      }

      if (newValues.stationName.length > 0) {
        filterer.push(this.filterOnText(newValues.stationName));
      }

      this.filterChanges.emit(filterer);
    });
    this.subscription.add(filtersFormGroupSubscription);
  }
}
