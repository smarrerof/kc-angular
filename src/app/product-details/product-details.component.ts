import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../product';
import { ProductFilter } from '../product-filter';
import { ProductService } from '../product.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnDestroy, OnInit {

  product: Product;
  products: Product[];

  private _productSubscription: Subscription;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this._route.data.forEach((data: { product: Product }) => {
      this.product = data.product;

      // Una vez cargado el producto actual podemos traer la lista de productos relacionados
      const productFilter: ProductFilter = <ProductFilter>{
        seller: this.product.seller.id
      };
      this._productService.getProducts(productFilter).subscribe((products: Product[]) => this.products = products);;
    });
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
    this._favoriteService.toggleFavorite(productId);
  }

  isFavorite(productId: number): string {
    return this._favoriteService.isFavorite(productId) ? 'fa-heart' : 'fa-heart-o';
  }

  onProductSelected(productId: number): void {
    this._router.navigate(['/products', productId]);
  }
}
