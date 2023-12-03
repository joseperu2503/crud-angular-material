import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Product } from '../../models/product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent {
  constructor(
    private router: Router,
    private productService: ProductService,
    public notificationService: NotificationService
  ) { }

  products: Product[] = []
  columns: string[] = ['name', 'price', 'stock', 'actions']
  loading: boolean = false

  pagination = {
    currentPage: 1,
    length: 0
  }

  ngOnInit(): void {
    this.loading = true
    this.getProducts(this.pagination.currentPage)
  }

  getProducts(page: number) {
    this.loading = true
    this.productService.getMyProducts(page)
      .subscribe({
        next: response => {
          this.products = response.data
          this.pagination = {
            currentPage: response.meta.current_page,
            length: response.meta.total
          }
          this.loading = false
        },
        error: error => {
          this.notificationService.error('An error occurred while loading the products.')
          this.loading = false
        }
      })
  }

  editProduct(productId: number) {
    this.router.navigate([`product/${productId}`])
  }

  createProduct() {
    this.router.navigate([`create-product`])
  }

  changePage(event: PageEvent) {
    this.getProducts(event.pageIndex + 1)
  }
}
