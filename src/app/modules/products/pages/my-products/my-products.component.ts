import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Product } from '../../models/product.model';

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

  ngOnInit(): void {
    this.loading = true
    this.getProducts()
  }

  getProducts() {
    this.loading = true
    this.productService.getMyProducts()
      .subscribe(
        response => {
          this.products = response.data
          this.loading = false
        }
      )
  }
}
