import { faker } from '@faker-js/faker';
import { Brand, FilterData } from './filter-data.model';

export const generateFilterData = (): FilterData => {
  const brands: Brand[] = [];

  for (let index = 0; index < 10; index++) {
    brands.push(generateBrand());
  }

  return {
    brands: brands,
    categories: [],
    genders: [],
    sizes: [],
  };
};

export const generateBrand = (): Brand => {
  return {
    id: faker.number.int(),
    name: faker.string.alpha(),
  };
};
