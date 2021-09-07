import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteButtonModule } from 'src/app/shared/components/favorite-button/favorite-button.module';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MapsModule } from 'src/app/shared/components/maps/maps.module';
import { FormatInServiceModule } from 'src/app/shared/pipes/format-in-service/format-in-service.module';
import { StationInformationSheetComponent } from './components/station-information-sheet/station-information-sheet.component';
import { ViewStationDetailComponent } from './containers/view-station-detail/view-station-detail.component';
import { StationDetailRoutingModule } from './station-detail-routing.module';
@NgModule({
  declarations: [StationInformationSheetComponent, ViewStationDetailComponent],
  imports: [
    CommonModule,
    FavoriteButtonModule,
    FormatInServiceModule,
    IconModule,
    LoaderModule,
    MapsModule,
    MatButtonModule,
    StationDetailRoutingModule,
  ],
})
export class StationDetailModule {}
