import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPresentationComponent } from './organization-presentation.component';

describe('OrganizationPresentationComponent', () => {
  let component: OrganizationPresentationComponent;
  let fixture: ComponentFixture<OrganizationPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
