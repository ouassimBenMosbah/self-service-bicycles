import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Station } from 'src/app/core/interfaces/station.interface';

@Component({
  selector: 'app-station-information-sheet',
  templateUrl: './station-information-sheet.component.html',
  styleUrls: ['./station-information-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationInformationSheetComponent implements OnInit {
  @Input() station!: Station;

  constructor() {}

  public ngOnInit(): void {}
}
