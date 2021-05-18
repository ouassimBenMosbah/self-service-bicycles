import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stations-filters',
  templateUrl: './stations-filters.component.html',
  styleUrls: ['./stations-filters.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
