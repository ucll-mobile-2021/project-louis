import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListPage } from './shopping-list-page.component';
import {ShopListPageComponent} from './shop-list-page/shop-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListPage,
  },
  {
    path: ':id/details',
    component: ShopListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
