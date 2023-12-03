import { AfterViewInit, Component } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Product } from 'src/app/modules/products/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private homeService: HomeService,
    public notificationService: NotificationService
  ) { }

  products: Product[] = []
  loading: boolean = false

  pagination = {
    currentPage: 1,
    totalPages: 1,
  }

  ngOnInit(): void {
    this.getProducts()
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.handleScroll());
  }

  getProducts() {
    if (this.pagination.currentPage > this.pagination.totalPages || this.loading) return;

    this.loading = true
    this.homeService.getProducts(this.pagination.currentPage)
      .subscribe({
        next: response => {
          this.pagination.currentPage = this.pagination.currentPage + 1
          this.pagination.totalPages = response.meta.last_page
          this.products.push(...response.data)
          this.loading = false
        },
        error: error => {
          this.notificationService.error('An error occurred while loading the products.')
          this.loading = false
        }
      })
  }

  handleScroll() {
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const distanceFromBottom = 300;
    const triggerPosition = pageHeight - windowHeight - distanceFromBottom;
    if (scrollPosition >= triggerPosition) {
      this.getProducts()
    }
  }
}
