import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewStationDetailComponent } from './containers/view-station-detail/view-station-detail.component';
import { StationDetailRoutingModule } from './station-detail-routing.module';

@NgModule({
  declarations: [ViewStationDetailComponent],
  imports: [CommonModule, StationDetailRoutingModule],
})
export class StationDetailModule {}
