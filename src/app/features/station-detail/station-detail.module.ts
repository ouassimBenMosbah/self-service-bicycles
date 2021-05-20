import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteButtonModule } from 'src/app/shared/components/favorite-button/favorite-button.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { FormatBooleanModule } from 'src/app/shared/pipes/format-boolean/format-boolean.module';
import { StationInformationSheetComponent } from './components/station-information-sheet/station-information-sheet.component';
import { ViewStationDetailComponent } from './containers/view-station-detail/view-station-detail.component';
import { StationDetailRoutingModule } from './station-detail-routing.module';

@NgModule({
  declarations: [StationInformationSheetComponent, ViewStationDetailComponent],
  imports: [
    CommonModule,
    FavoriteButtonModule,
    FormatBooleanModule,
    LoaderModule,
    StationDetailRoutingModule,
  ],
})
export class StationDetailModule {}
