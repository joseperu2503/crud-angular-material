import { Component, Input } from '@angular/core';
import { Product } from 'src/app/modules/products/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product?: Product

  imageError = false

  onImageError() {
    this.imageError = true
  }
}
