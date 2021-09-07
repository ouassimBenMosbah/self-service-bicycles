import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { MyMapUtils } from 'src/app/shared/utils/map';
import { MyStringUtils } from 'src/app/shared/utils/string';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilterer, StationsFilters } from '../../interfaces/stations-filters.interface';

@Component({
  selector: 'app-stations-filters',
  templateUrl: './stations-filters.component.html',
  styleUrls: ['./stations-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsFiltersComponent implements OnInit, OnDestroy {
  @Input() clientPosition: google.maps.LatLngLiteral | undefined;

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

  private filterOnText(text: string): (station: Station) => boolean {
    return (station: Station): boolean => {
      return MyStringUtils.isContaining(station.name, text);
    };
  }

  private filterOnBikeAvailability(station: Station): boolean {
    return station.num_bikes_available > 0;
  }

  private filterOnDockAvailability(station: Station): boolean {
    return station.num_docks_available > 0;
  }

  private filterOnStationNearMe(clientPosition: google.maps.LatLngLiteral | undefined): (station: Station) => boolean {
    return (station: Station): boolean => {
      return this.isStationNearClient(station, clientPosition);
    };
  }

  private isStationNearClient(station: Station, clientPosition: google.maps.LatLngLiteral | undefined): boolean {
    return (
      !!station.lat &&
      !!station.lon &&
      !!clientPosition?.lat &&
      !!clientPosition.lng &&
      MyMapUtils.getDistanceFromLatLonInKm(station.lat, station.lon, clientPosition.lat, clientPosition.lng) < 1.5
    );
  }

  private emitValueChanges(filtersFormGroup: FormGroup): void {
    const filtersFormGroupSubscription = filtersFormGroup.valueChanges.subscribe((newValues: StationsFilters) => {
      const filterer: StationsFilterer[] = [];

      if (newValues.stationName.length > 0) {
        filterer.push(this.filterOnText(newValues.stationName));
      }

      if (newValues.someBikesAvailable) {
        filterer.push(this.filterOnBikeAvailability);
      }

      if (newValues.someFreeDocksAvailable) {
        filterer.push(this.filterOnDockAvailability);
      }

      if (newValues.isNearMe) {
        filterer.push(this.filterOnStationNearMe(this.clientPosition));
      }

      this.filterChanges.emit(filterer);
    });
    this.subscription.add(filtersFormGroupSubscription);
  }
}
