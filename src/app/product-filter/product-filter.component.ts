import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { State } from '../state';
import { StateService } from '../state.service';
import { ProductFilter } from '../product-filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy, OnInit {

  @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

  productFilter: ProductFilter = {};
  categories: Category[];
  states: State[];

  private _categoriesSubscription: Subscription;
  private _statesSubscription: Subscription;

  constructor(
    private _categoryService: CategoryService,
    private _stateService: StateService) { }

  ngOnInit(): void {
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data );
    this._statesSubscription = this._stateService
      .getStates()
      .subscribe((data: State[]) => this.states = data );
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
    this._statesSubscription.unsubscribe();
  }

  notifyHost(): void {
    this.onSearch.emit(this.productFilter);
  }

  onSortChange(name: string): void {
    if (this.productFilter.name === name) {
      this.productFilter.order = !this.productFilter.order;
    } else {
      this.productFilter.name = name;
      this.productFilter.order = true;
    }
    console.log('onSortChange', this.productFilter);
  }
}
