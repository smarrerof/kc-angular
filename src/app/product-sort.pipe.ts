import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './product';
import { ProductFilter } from './product-filter';

@Pipe({
  name: 'productsort'/*, 
  pure: false*/
})
export class ProductSortPipe implements PipeTransform {

  transform(products: Product[], filter: ProductFilter): any {
    console.log('ProductSortPipe:transform');
    if (!products) {
      return [];
    }

    if (!filter || filter.name === '') {
      return products;
    }

    let sorted: any[];
    sorted = products.sort((a: any, b: any): number => {
      if (a[filter.name] > b[filter.name]) {
        return filter.order ? 1 : -1;
      } else if (a[filter.name] < b[filter.name]) {
        return filter.order ? -1 : 1;
      } else {
        return 0;
      }
    });

    return products;
  }
}
