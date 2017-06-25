import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './product';
import { ProductSort } from './product-sort';

@Pipe({
  name: 'sort', 
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(products: Product[], sort: ProductSort): any {
    if (!products) {
      return [];
    }

    if (!sort && sort.properyName === '') {
      return products;
    }

    let sorted: Product[];
    sorted = products.sort((a: Product, b: Product): number => {
      if (a[sort.properyName] > b[sort.properyName]) {
        return sort.order ? 1 : -1;
      } else if (a[sort.properyName] < b[sort.properyName]) {
        return sort.order ? -1 : 1;
      } else {
        return 0;
      }
    });

    return products;
  }



}
