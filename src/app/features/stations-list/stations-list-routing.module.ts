import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';

const routes: Routes = [{ path: '', component: ViewStationsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationsListRoutingModule {}
