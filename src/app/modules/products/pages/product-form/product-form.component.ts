import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand, Category, Gender, ProductToProductForm, Size } from '../../models/product.model';
import { ImageService } from 'src/app/core/services/image/image.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('inputImages') input?: ElementRef<HTMLInputElement>;

  constructor(
    private productService: ProductService,
    private formService: FormService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.loadData()
  }

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
    stock: new FormControl<number | null>(null, [Validators.required]),
    images: new FormControl<string[]>([], { nonNullable: true }),
    colors: new FormControl<string[]>([], { nonNullable: true }),
    genders: new FormControl<number[]>([], { nonNullable: true }),
    sizes: new FormControl<number[]>([], { nonNullable: true }),
    brand_id: new FormControl<number | null>(null),
    category_id: new FormControl<number | null>(null),
    free_shipping: new FormControl<boolean>(false, { nonNullable: true }),
  });

  loading: boolean = false
  loadingImage: boolean = false

  productId: string | null = null;

  brands: Brand[] = [];
  categories: Category[] = [];
  sizes: Size[] = [];
  genders: Gender[] = [];

  title: string = ''
  colorPicker: string = '#000000';

  loadData() {
    this.loading = true
    this.title = this.productId ? 'Edit Product' : 'New Product'
    this.loadFormData()
  }

  getProduct() {
    if (this.productId) {
      this.productService.getProduct(parseInt(this.productId))
        .subscribe({
          next: response => {
            this.form.patchValue(ProductToProductForm(response))
          },
          complete: () => {
            this.loading = false;
          }
        })
    } else {
      this.loading = false;
    }
  }

  loadFormData() {
    this.productService.getFormData()
      .subscribe({
        next: response => {
          this.brands = response.brands;
          this.categories = response.categories;
          this.genders = response.genders;
          this.sizes = response.sizes;
        },
        complete: () => {
          this.getProduct()
        }
      })
  }

  submit() {
    if (this.form.valid) {
      this.loading = true
      let service
      if (this.productId) {
        service = this.productService.updateProduct(parseInt(this.productId), this.form.getRawValue())
      } else {
        service = this.productService.createProduct(this.form.getRawValue())
      }

      service.subscribe({
        next: response => {
          this.loading = false
          this.notificationService.success(response.message);
          this.router.navigate(['/my-products'])
        },
        error: error => {
          this.loading = false
          this.notificationService.error('An error occurred. Please try again.');
        }
      })
    } else {
      this.form.markAllAsTouched()
    }
  }

  addColor() {
    if (this.form.value.colors) {
      this.form.controls.colors.setValue([...this.form.value.colors, this.colorPicker])
    }
  }

  uploadImages(event: Event) {
    const target = event.target as HTMLInputElement;
    let images: FileList | null = target.files
    if (images && images.length > 0) {
      this.loadingImage = true;

      this.imageService.uploadImages(images)
        .subscribe({
          next: response => {
            if (this.form.value.images) {
              let newImages = [...this.form.value.images, ...response]
              this.form.controls.images.patchValue(newImages);
            }
            this.loadingImage = false
          },
          error: error => {
            this.loadingImage = false
          }
        })
    }
  }

  clickAddImage() {
    this.input?.nativeElement.click()
  }

  cancel() {
    this.router.navigate(['/my-products'])
  }
}
