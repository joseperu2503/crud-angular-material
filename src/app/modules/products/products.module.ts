import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@NgModule({
  declarations: [
    MyProductsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductsModule { }
