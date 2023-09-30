export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  brand: Brand | null;
  category: Category | null;
  colors: string[];
  sizes: Size[];
  genders: Gender[];
  free_shipping: boolean;
  created_at: string;
}

export interface ProductErrors {
  name?: string[];
  description?: string[];
  price?: string[];
  stock?: string[];
  images?: string[];
  colors?: string[];
  genders?: string[];
  sizes?: string[];
  brand_id?: string[];
  category_id?: string[];
  free_shipping?: string[];
}

export interface ProductForm {
  id?: number;
  name: string | null;
  description: string | null;
  price: number | null;
  stock: number | null;
  images: string[];
  colors: string[];
  genders: number[];
  sizes: number[];
  brand_id: number | null;
  category_id: number | null;
  free_shipping: boolean;
}

export interface ProductFormDataResponse {
  brands: Brand[];
  categories: Category[];
  genders: Gender[];
  sizes: Size[];
}

export interface Gender {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Brand {
  id: number;
  name: string;
}

export const ProductToProductForm = (product: Product): ProductForm => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    images: product.images,
    colors: product.colors,
    genders: product.genders.map(gender => gender.id),
    sizes: product.sizes.map(size => size.id),
    brand_id: product.brand ? product.brand.id : null,
    category_id: product.category ? product.category.id : null,
    free_shipping: product.free_shipping
  }
}

export interface ProductOperationResponse {
  success: boolean;
  message: string;
};
