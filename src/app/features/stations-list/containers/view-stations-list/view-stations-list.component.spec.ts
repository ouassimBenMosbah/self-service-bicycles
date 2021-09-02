import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStationsListComponent } from './view-stations-list.component';

describe('ViewStationsListComponent', () => {
  let component: ViewStationsListComponent;
  let fixture: ComponentFixture<ViewStationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStationsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
