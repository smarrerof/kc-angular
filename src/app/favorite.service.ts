import { Injectable } from '@angular/core';

@Injectable()
export class FavoriteService {
  private _favorites: number[] = null;

  private getFavorites(): number[] {
    // Si los favoritos están cargados, devolvemos la lista (nos ahorramos deserializar continuamente)
    if (this._favorites !== null) {
      return this._favorites;
    }

    // Recuperamos la lista de favoritos y la inicializamos si es nula
    this._favorites = JSON.parse(localStorage.getItem('favorites'));
    if (this._favorites === null) {
      //this._favorites = [];
      return this._favorites = [];
    }

    return this._favorites;
  }

  private setFavorites(favorites: number[]) {
    // Guardamos de nuevo la lista de favoritos
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this._favorites = favorites;
  }

  public isFavorite(productId: number): boolean {  
    const favorites = this.getFavorites();
    return !(this._favorites.indexOf(productId) === -1);  
  }

  public toggleFavorite(productId: number) {
    const favorites = this.getFavorites();
    const indexOf = favorites.indexOf(productId);
    if (indexOf === -1) {
      favorites.push(productId);
    } else {
      favorites.splice(indexOf, 1);
    }

    this.setFavorites(favorites);
  }
}
