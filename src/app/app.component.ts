import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GbfsApiService } from './core/gbfs-api/services/gbfs-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private gbfsApiService: GbfsApiService) {}

  public ngOnInit(): void {
    this.gbfsApiService.getStationInformation().subscribe(console.log);
    // this.gbfsApiService.getStationStatus().subscribe(console.log);
  }
}
