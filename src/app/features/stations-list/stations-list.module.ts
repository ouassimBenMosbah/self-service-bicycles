import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormatBooleanModule } from 'src/app/shared/pipes/format-boolean/format-boolean.module';
import { StationsDisplayComponent } from './components/stations-display/stations-display.component';
import { StationsFiltersComponent } from './components/stations-filters/stations-filters.component';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';
import { StationsListRoutingModule } from './stations-list-routing.module';

@NgModule({
  declarations: [
    StationsDisplayComponent,
    StationsFiltersComponent,
    ViewStationsListComponent,
  ],
  imports: [
    CommonModule,
    FormatBooleanModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    StationsListRoutingModule,
  ],
})
export class StationsListModule {}
