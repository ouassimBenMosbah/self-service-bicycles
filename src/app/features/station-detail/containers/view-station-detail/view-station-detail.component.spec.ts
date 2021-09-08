import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { Station } from 'src/app/core/interfaces/station.interface';
import { StationsDatastoreService } from 'src/app/shared/services/stations-datastore.service';
import { StationDetailService } from '../../services/station-detail.service';
import { ViewStationDetailComponent } from './view-station-detail.component';

describe('ViewStationDetailComponent', () => {
  let component: ViewStationDetailComponent;
  let fixture: ComponentFixture<ViewStationDetailComponent>;
  let dataService: StationsDatastoreService;
  let detailService: StationDetailService;
  let params$: Subject<Params>;
  let station: Station = {
    station_id: 'test-station',
    name: 'Test Station',
    lat: 0,
    lon: 0,
    capacity: 12,
    is_installed: true,
    is_renting: true,
    is_returning: false,
    last_reported: 1,
    num_bikes_available: 3,
    num_bikes_disabled: 0,
    num_docks_available: 12,
    updatedAt: new Date(2021, 1, 1),
  };

  beforeEach(() => {
    params$ = new Subject();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ViewStationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: params$
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewStationDetailComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(StationsDatastoreService);
    detailService = TestBed.inject(StationDetailService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle favorite button', () => {
    beforeEach(() => {
      spyOn(detailService, 'isFavoriteStation');
      spyOn(dataService, 'toggleFavoriteStation');
      spyOn(detailService, 'getOneStation').and.returnValue(of(station));
    });

    it('should send request to API', () => {
      params$.next({ id: 'test-station' });
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.station-detail-wrapper__favorite-block')).nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(dataService.toggleFavoriteStation).toHaveBeenCalled();
    });
  });
});
