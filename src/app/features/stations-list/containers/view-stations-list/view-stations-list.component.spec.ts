import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewStationsListComponent } from './view-stations-list.component';

describe('ViewStationsListComponent', () => {
  let component: ViewStationsListComponent;
  let fixture: ComponentFixture<ViewStationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStationsListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
