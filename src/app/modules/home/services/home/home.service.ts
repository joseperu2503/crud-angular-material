import { Injectable } from '@angular/core';
import { ResponsePaginate } from 'src/app/core/models/response-paginate.model';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Product } from 'src/app/modules/products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpService
  ) { }

  getProducts(page: number) {
    return this.http.get<ResponsePaginate<Product>>(`products?page=${page}`)
  }
}
