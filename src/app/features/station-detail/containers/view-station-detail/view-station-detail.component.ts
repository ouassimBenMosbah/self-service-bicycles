import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-view-station-detail',
  templateUrl: './view-station-detail.component.html',
  styleUrls: ['./view-station-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewStationDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
