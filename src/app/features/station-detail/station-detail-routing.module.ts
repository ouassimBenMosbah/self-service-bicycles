import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStationDetailComponent } from './containers/view-station-detail/view-station-detail.component';

const routes: Routes = [{ path: '', component: ViewStationDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationDetailRoutingModule {}
