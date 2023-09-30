import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Product, ProductForm, ProductFormDataResponse } from '../../models/product.model';
import { ResponsePaginate } from 'src/app/core/models/response-paginate.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpService,
  ) { }

  getMyProducts() {
    return this.http.get<ResponsePaginate<Product>>('my-products')
  }

  getProduct(productId: number) {
    return this.http.get<Product>(`products/${productId}`)
  }

  createProduct(productForm: ProductForm) {
    return this.http.post('products', productForm)
  }

  updateProduct(productId: number, productForm: ProductForm) {
    return this.http.put(`products/${productId}`, productForm)
  }

  deleteProduct(productForm: number) {
    return this.http.delete(`products/${productForm}`)
  }

  getFormData() {
    return this.http.get<ProductFormDataResponse>(`products/form-data`)
  }
}
