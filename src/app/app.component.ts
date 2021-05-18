import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GbfsApiService } from './core/gbfs-api/services/gbfs-api.service';
import { StationsDatastoreService } from './shared/services/stations-datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private stationsDatastore: StationsDatastoreService) {}

  public ngOnInit(): void {
    this.stationsDatastore.fetchStationsData().subscribe();
  }
}
