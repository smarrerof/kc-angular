import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data: Product;

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Green Path                                                       |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Expón un atributo de salida con el decorador correspondiente. El |
  | tipo de dicho atributo debe permitir la emisión de eventos; la   |
  | idea es enviar al componente padre el producto sobre el cuál se  |
  | ha hecho clic. Y puesto que dicho clic se realiza en el template |
  | de este componente, necesitas, además, un manejador para el      |
  | mismo.                                                           |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  @Output() productSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() setFavorite: EventEmitter<number> = new EventEmitter<number>();

  onProductClick(productId: number): void {
    this.productSelected.emit(productId);
  }

  onFavoriteClick(productId: number): void {
    this.setFavorite.emit(productId);
  }

  isFavorite(productId: number): string {
    // Recuperamos la lista de favoritos y la inicializamos si es nula
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites'));
    if (favorites === null) {
      favorites = [];
    }

    // Buscamos el producto en lista de favoritos
    return favorites.indexOf(productId) === -1 ? 'fa-heart-o' : 'fa-heart';
  }
}
