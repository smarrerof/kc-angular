import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnDestroy, OnInit {

  product: Product;
  private _productSubscription: Subscription;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._route.data.forEach((data: { product: Product }) => this.product = data.product);
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    if (this._productSubscription !== undefined) {
      this._productSubscription.unsubscribe();
    }
  }

  private _buyProduct(): void {
    this._productSubscription = this._productService
      .buyProduct(this.product.id)
      .subscribe(() => this._showPurchaseConfirmation())
  }

  private _showPurchaseConfirmation(): void {
    this._confirmationService.confirm({
      rejectVisible: false,
      message: 'Producto comprado. ¡Enhorabuena!',
      accept: () => this._router.navigate(['/product'])
    });
  }

  showPurchaseWarning(): void {
    this._confirmationService.confirm({
      message: `Vas a comprar ${this.product.name}. ¿Estás seguro?`,
      accept: () => this._buyProduct()
    });
  }

  goBack(): void {
    window.history.back();
  }

  onFavoriteClick(productId: number): void {
    // Recuperamos la lista de favoritos y la inicializamos si es nula
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites'));
    if (favorites === null) {
      favorites = [];
    }

    // Buscamos el producto en lista de favoritos para invertir la selección.
    const indexOf = favorites.indexOf(productId);
    if (indexOf === -1) {
      favorites.push(productId);
    } else {
      favorites.splice(indexOf, 1);
    }

    // Guardamos de nuevo la lista de favoritos
    localStorage.setItem('favorites', JSON.stringify(favorites));
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
