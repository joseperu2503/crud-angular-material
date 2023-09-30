import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const routes: Routes = [
  {
    path: 'my-products',
    component: MyProductsComponent
  },
  {
    path: 'create-product',
    component: ProductFormComponent
  },
  {
    path: 'product/:productId',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
