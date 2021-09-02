import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilters } from '../../interfaces/stations-filters.interface';

@Component({
  selector: 'app-stations-filters',
  templateUrl: './stations-filters.component.html',
  styleUrls: ['./stations-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsFiltersComponent implements OnInit, OnDestroy {
  @Output() filterChanges: EventEmitter<StationsFilters> = new EventEmitter();

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

  private emitValueChanges(filtersFormGroup: FormGroup): void {
    const filtersFormGroupSubscription = filtersFormGroup.valueChanges.subscribe((newValues: StationsFilters) => {
      this.filterChanges.emit(newValues);
    });
    this.subscription.add(filtersFormGroupSubscription);
  }
}
