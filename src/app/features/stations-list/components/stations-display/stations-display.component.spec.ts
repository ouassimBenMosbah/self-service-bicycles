import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatInServicePipe } from 'src/app/shared/pipes/format-in-service/format-in-service.pipe';

import { StationsDisplayComponent } from './stations-display.component';

describe('StationsDisplayComponent', () => {
  let component: StationsDisplayComponent;
  let fixture: ComponentFixture<StationsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationsDisplayComponent, FormatInServicePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
