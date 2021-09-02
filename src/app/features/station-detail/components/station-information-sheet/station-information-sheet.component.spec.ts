import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationInformationSheetComponent } from './station-information-sheet.component';

describe('StationInformationSheetComponent', () => {
  let component: StationInformationSheetComponent;
  let fixture: ComponentFixture<StationInformationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationInformationSheetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationInformationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
