import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStationDetailComponent } from './view-station-detail.component';

describe('ViewStationDetailComponent', () => {
  let component: ViewStationDetailComponent;
  let fixture: ComponentFixture<ViewStationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
