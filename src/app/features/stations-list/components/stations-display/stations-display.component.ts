import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-stations-display',
  templateUrl: './stations-display.component.html',
  styleUrls: ['./stations-display.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsDisplayComponent implements OnInit {
  @Input() station!: Station;

  constructor() {}

  ngOnInit(): void {}
}
