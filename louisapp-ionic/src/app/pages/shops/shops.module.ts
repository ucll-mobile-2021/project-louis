import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopsPage } from './shops-page.component';

import { ShopsRoutingModule } from './shops-routing.module';
import {AddShopComponent} from './add-shop/add-shop.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShopsPage }]),
    ShopsRoutingModule,
  ],
  declarations: [ShopsPage, AddShopComponent]
})
export class ShopsModule {}
