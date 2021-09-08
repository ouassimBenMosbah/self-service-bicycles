import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { StationsListComponent } from './stations-list.component';

describe('StationsListComponent', () => {
  let component: StationsListComponent;
  let fixture: ComponentFixture<StationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationsListComponent, IconComponent],
      imports: [MatRippleModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
