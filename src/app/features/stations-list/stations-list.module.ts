import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FavoriteButtonModule } from 'src/app/shared/components/favorite-button/favorite-button.module';
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
    FavoriteButtonModule,
    FormatBooleanModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    StationsListRoutingModule,
  ],
})
export class StationsListModule {}
