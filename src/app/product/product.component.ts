import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';
import { FavoriteService } from '../favorite.service';

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
  @Output() toggleFavorite: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _favoriteService: FavoriteService) { }

  onProductClick(productId: number): void {
    this.productSelected.emit(productId);
  }

  onFavoriteClick(productId: number): void {
    this.toggleFavorite.emit(productId);
  }

  public isFavorite(productId: number): string {
    return this._favoriteService.isFavorite(productId) ? 'fa-heart' : 'fa-heart-o';
  }
}
