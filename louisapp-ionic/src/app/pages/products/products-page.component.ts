import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {ModalController} from '@ionic/angular';
import {AddProductComponent} from './add-product/add-product.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'products-page.component.html',
  styleUrls: ['products-page.component.scss']
})
export class ProductsPage implements OnInit {
  public products: Product[];

  constructor(private productService: ProductService,
              private modalController: ModalController) {}

  public ngOnInit() {
    this.refresh();
  }

  private refresh(): void {
    this.productService.getAll().subscribe(products => this.products = products);
  }

  async presentAddModal() {
    const modal = await this.modalController.create({
      component: AddProductComponent
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.refresh());
  }

}
