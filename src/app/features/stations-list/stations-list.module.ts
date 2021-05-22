import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FavoriteButtonModule } from 'src/app/shared/components/favorite-button/favorite-button.module';
import { MapsModule } from 'src/app/shared/components/maps/maps.module';
import { FormatBooleanModule } from 'src/app/shared/pipes/format-boolean/format-boolean.module';
import { FormatInServiceModule } from 'src/app/shared/pipes/format-in-service/format-in-service.module';
import { StationsDisplayComponent } from './components/stations-display/stations-display.component';
import { StationsFiltersComponent } from './components/stations-filters/stations-filters.component';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';
import { StationsListRoutingModule } from './stations-list-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

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
    FormatInServiceModule,
    MapsModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    StationsListRoutingModule,
  ],
})
export class StationsListModule {}
