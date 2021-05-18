import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GbfsApiService } from './core/gbfs-api/services/gbfs-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {}
}
