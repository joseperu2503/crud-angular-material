import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePaginate } from 'src/app/core/models/response-paginate.model';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Product } from 'src/app/modules/products/models/product.model';
import { FilterData } from '../../models/filter-data.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpService
  ) { }

  getProducts(
    page: number,
    brandId: number | null,
    categoryId: number | null,
    minPrice: string,
    maxPrice: string,
    search: string,
  ) {

    const params = new HttpParams({
      fromObject: {
        page: page,
        category_id: categoryId ?? '',
        brand_id: brandId ?? '',
        min_price: minPrice ?? '',
        max_price: maxPrice ?? '',
        search,
      },
    });
    return this.http.get<ResponsePaginate<Product>>(`products`, params)
  }

  getFilterData() {
    return this.http.get<FilterData>(`products/filter-data`)
  }
}
