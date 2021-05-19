import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { INITIAL_STATIONS_FILTERS_VALUE } from '../../constants/initial-filters.constant';
import { StationsFilters } from '../../interfaces/stations-filters.interface';

@UntilDestroy()
@Component({
  selector: 'app-stations-filters',
  templateUrl: './stations-filters.component.html',
  styleUrls: ['./stations-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsFiltersComponent implements OnInit {
  @Output() filterChanges: EventEmitter<StationsFilters> = new EventEmitter();

  public filtersFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.filtersFormGroup = this.initializeFormGroup();
    this.emitValueChanges(this.filtersFormGroup);
  }

  private initializeFormGroup(): FormGroup {
    return this.fb.group({ ...INITIAL_STATIONS_FILTERS_VALUE });
  }

  private emitValueChanges(filtersFormGroup: FormGroup) {
    filtersFormGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((newValues: StationsFilters) => {
        this.filterChanges.emit(newValues);
      });
  }
}
