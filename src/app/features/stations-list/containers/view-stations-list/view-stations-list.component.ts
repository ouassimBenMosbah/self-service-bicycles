import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-view-stations-list',
  templateUrl: './view-stations-list.component.html',
  styleUrls: ['./view-stations-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewStationsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
