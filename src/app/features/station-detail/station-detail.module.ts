import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatBooleanModule } from 'src/app/shared/pipes/format-boolean/format-boolean.module';
import { StationInformationSheetComponent } from './components/station-information-sheet/station-information-sheet.component';
import { ViewStationDetailComponent } from './containers/view-station-detail/view-station-detail.component';
import { StationDetailRoutingModule } from './station-detail-routing.module';

@NgModule({
  declarations: [StationInformationSheetComponent, ViewStationDetailComponent],
  imports: [CommonModule, FormatBooleanModule, StationDetailRoutingModule],
})
export class StationDetailModule {}
