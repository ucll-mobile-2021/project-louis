import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductsPage} from './products-page.component';

import {ProductsRoutingModule} from './products-routing.module';
import {AddProductComponent} from './add-product/add-product.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsPage, AddProductComponent]
})
export class ProductsModule {}
