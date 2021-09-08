import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { SafeHtmlModule } from '../../pipes/safe-html/safe-html.module';
import { MapsComponent } from './maps.component';

xdescribe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapsComponent],
      imports: [SafeHtmlModule, GoogleMapsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
