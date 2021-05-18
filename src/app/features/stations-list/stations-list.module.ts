import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StationsListRoutingModule } from './stations-list-routing.module';
import { ViewStationsListComponent } from './containers/view-stations-list/view-stations-list.component';

@NgModule({
  declarations: [ViewStationsListComponent],
  imports: [CommonModule, StationsListRoutingModule],
})
export class StationsListModule {}
