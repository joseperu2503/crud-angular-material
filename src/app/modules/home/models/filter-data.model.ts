export interface FilterData {
  genders: Gender[];
  brands: Brand[];
  categories: Category[];
  sizes: Size[];
}

export interface Gender {
  id: number | null;
  name: string;
}

export interface Brand {
  id: number | null;
  name: string;
}

export interface Category {
  id: number | null;
  name: string;
}

export interface Size {
  id: number | null;
  name: string;
}

export interface Filter {
  categoryId: number | null;
  brandId: number | null;
  minPrice: string;
  maxPrice: string;
  search: string;
}



