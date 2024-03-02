import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterData } from '../../models/filter-data.model';
import { environment } from 'src/environments/environment';
import { generateFilterData } from '../../models/filter.data.mock';

fdescribe('HomeService', () => {
  let service: HomeService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HomeService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getFilterData', () => {
    it('should return a filter data', (doneFn) => {
      //Arrange
      const mockData: FilterData = generateFilterData();

      //Act
      service.getFilterData().subscribe((response) => {
        //Asert
        expect(response.brands.length).toEqual(mockData.brands.length);
        expect(response.categories.length).toEqual(mockData.categories.length);
        expect(response.genders.length).toEqual(mockData.genders.length);
        expect(response.sizes.length).toEqual(mockData.sizes.length);

        doneFn();
      });

      //http config
      const url = `${environment.APP_API_URL}/products/filter-data`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
