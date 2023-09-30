import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Brand, Category, Gender, ProductToProductForm, Size } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private formService: FormService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    if (this.productId) {
      this.loadData()
    }
  }

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
    stock: new FormControl<number | null>(null, [Validators.required]),
    images: new FormControl<string[]>([]),
    colors: new FormControl<string[]>([], {nonNullable: true}),
    genders: new FormControl<number[]>([]),
    sizes: new FormControl<number[]>([]),
    brand_id: new FormControl<number | null>(null),
    category_id: new FormControl<number | null>(null),
    free_shipping: new FormControl<boolean>(false),
  });

  loading: boolean = false
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
    this.loading = true
    let service
    // if(this.productId){
    //   service = this.productService.updateProduct(parseInt(this.productId), this.form.getRawValue())
    // }else{
    //   service = this.productService.createProduct(this.form.getRawValue())
    // }

    // service.subscribe({
    //   next: response => {
    //   },
    //   error: error => {
    //     this.form = this.formService.setErrors(this.form, error)
    //   },
    //   complete: () => {
    //     this.loading = false
    //   }
    // })

  }

  addColor() {
    if(this.form.value.colors){
      this.form.controls.colors.setValue([...this.form.value.colors, this.colorPicker])
    }
  }
}
