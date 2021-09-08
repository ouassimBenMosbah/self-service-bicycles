import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../icon/icon.component';

import { FavoriteButtonComponent } from './favorite-button.component';

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteButtonComponent, IconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
