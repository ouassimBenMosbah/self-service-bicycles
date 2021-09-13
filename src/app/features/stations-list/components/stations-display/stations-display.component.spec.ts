import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteButtonComponent } from 'src/app/shared/components/favorite-button/favorite-button.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { FormatInServiceModule } from 'src/app/shared/pipes/format-in-service/format-in-service.module';
import { FormatInServicePipe } from 'src/app/shared/pipes/format-in-service/format-in-service.pipe';

import { StationsDisplayComponent } from './stations-display.component';

describe('StationsDisplayComponent', () => {
  let component: StationsDisplayComponent;
  let fixture: ComponentFixture<StationsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationsDisplayComponent, IconComponent, FavoriteButtonComponent, LoaderComponent],
      imports: [FormatInServiceModule],
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
