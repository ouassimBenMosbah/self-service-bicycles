import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsFiltersComponent } from './stations-filters.component';

describe('StationsFiltersComponent', () => {
  let component: StationsFiltersComponent;
  let fixture: ComponentFixture<StationsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
