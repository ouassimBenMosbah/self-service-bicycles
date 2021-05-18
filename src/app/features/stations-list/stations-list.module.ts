import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatBooleanModule } from 'src/app/shared/pipes/format-boolean/format-boolean.module';
import { StationsDisplayComponent } from './components/stations-display/stations-display.component';
import { StationsFiltersComponent } from './components/stations-filters/stations-filters.component';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';
import { StationsListRoutingModule } from './stations-list-routing.module';

@NgModule({
  declarations: [
    ViewStationsListComponent,
    StationsFiltersComponent,
    StationsDisplayComponent,
  ],
  imports: [CommonModule, StationsListRoutingModule, FormatBooleanModule],
})
export class StationsListModule {}
