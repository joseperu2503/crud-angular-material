import { Component } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Product } from 'src/app/modules/products/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    public notificationService: NotificationService
  ) { }

  products: Product[] = []
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this.getProducts()
  }

  getProducts() {
    this.loading = true
    this.homeService.getProducts()
      .subscribe({
        next: response => {
          this.products = response.data
          this.loading = false
        },
        error: error => {
          this.notificationService.error('An error occurred while loading the products.')
        }
      })
  }
}
