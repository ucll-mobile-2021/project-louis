import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListPage } from './shopping-list-page.component';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import {ShopListPageComponent} from './shop-list-page/shop-list-page.component';
import {AddShoppingListProductComponent} from "./add-shopping-list-product/add-shopping-list-product.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  declarations: [ShoppingListPage, ShopListPageComponent, AddShoppingListProductComponent]
})
export class ShoppingListModule {}
