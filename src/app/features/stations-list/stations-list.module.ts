import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FavoriteButtonModule } from 'src/app/shared/components/favorite-button/favorite-button.module';
import { MapsModule } from 'src/app/shared/components/maps/maps.module';
import { FormatInServiceModule } from 'src/app/shared/pipes/format-in-service/format-in-service.module';
import { StationsDisplayComponent } from './components/stations-display/stations-display.component';
import { StationsFiltersComponent } from './components/stations-filters/stations-filters.component';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';
import { StationsListRoutingModule } from './stations-list-routing.module';
import { StationsListComponent } from './components/stations-list/stations-list.component';
import { IconModule } from 'src/app/shared/components/icon/icon.module';

@NgModule({
  declarations: [StationsDisplayComponent, StationsFiltersComponent, ViewStationsListComponent, StationsListComponent],
  imports: [
    CommonModule,
    FavoriteButtonModule,
    FormatInServiceModule,
    IconModule,
    MapsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTabsModule,
    ReactiveFormsModule,
    StationsListRoutingModule,
  ],
})
export class StationsListModule {}
