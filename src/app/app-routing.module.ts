import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'stations',
    loadChildren: () => import('./features/stations-list/stations-list.module').then(m => m.StationsListModule),
  },
  {
    path: 'stations/:id',
    loadChildren: () => import('./features/station-detail/station-detail.module').then(m => m.StationDetailModule),
  },
  {
    path: '**',
    redirectTo: 'stations',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
