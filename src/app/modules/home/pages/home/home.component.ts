import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Product } from 'src/app/modules/products/models/product.model';
import { Filter, FilterData } from '../../models/filter-data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSliderDragEvent } from '@angular/material/slider';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private homeService: HomeService,
    public notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  products: Product[] = []
  loading: boolean = false

  pagination = {
    currentPage: 1,
    totalPages: 1,
  }

  filter = new FormGroup({
    search: new FormControl<string>('', { nonNullable: true }),
    minPrice: new FormControl<string>('0', { nonNullable: true }),
    maxPrice: new FormControl<string>('4000', { nonNullable: true }),
    brandId: new FormControl<number | null>(null),
    categoryId: new FormControl<number | null>(null),
  });

  filterData: FilterData = {
    brands: [],
    categories: [],
    genders: [],
    sizes: [],
  }

  ngOnInit(): void {
    this.getFilterData();

    //detectar cuando deja de escribir
    this.filter.get('search')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.changeFilter();
    });
  }

  changeFilter() {
    this.pagination = {
      currentPage: 1,
      totalPages: 1,
    }
    this.products = [];
    this.getProducts();
  }

  getProducts(verifyLoading = true) {
    if (this.pagination.currentPage > this.pagination.totalPages) return;
    if (verifyLoading && this.loading) return;

    this.loading = true
    this.homeService.getProducts(
      this.pagination.currentPage,
      this.filter.getRawValue().brandId,
      this.filter.getRawValue().categoryId,
      this.filter.getRawValue().minPrice,
      this.filter.getRawValue().maxPrice,
      this.filter.getRawValue().search
    )
      .subscribe({
        next: response => {
          this.pagination.currentPage = this.pagination.currentPage + 1
          this.pagination.totalPages = response.meta.last_page
          this.products.push(...response.data)
          this.loading = false
          this.cdr.detectChanges();

        },
        error: error => {
          this.notificationService.error('An error occurred while loading the products.')
          this.loading = false
        }
      })
  }


  getFilterData() {
    this.loading = true
    this.homeService.getFilterData()
      .subscribe({
        next: response => {
          this.filterData = response;
          this.getProducts(false);
        },
        error: error => {
          this.notificationService.error('An error occurred while loading the filters.')
          this.loading = false
        }
      })
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.handleScroll());
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
