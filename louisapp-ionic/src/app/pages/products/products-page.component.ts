import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ModalController, ToastController } from '@ionic/angular';
import { AddProductComponent } from './add-product/add-product.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'products-page.component.html',
  styleUrls: ['products-page.component.scss'],
  providers: [Clipboard]
})
export class ProductsPage implements OnInit {
  public products: Product[];

  constructor(private productService: ProductService,
    private modalController: ModalController, private clipboard: Clipboard, private toastController: ToastController) { }

  public ngOnInit() {
    this.refresh();
  }

  private refresh(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.products.forEach(x => {
        if (localStorage.getItem(x.name)) {
          x.image = localStorage.getItem(x.name);
        }
    });
    console.log(this.products);
    });
}

public copy(text: string) {
  this.clipboard.copy(text);
  const toast = this.toastController.create({
    color: 'dark',
    message: 'Text copied',
    duration: 2000
  });
  toast.then(x => x.present());
}

async presentAddModal() {
  const modal = await this.modalController.create({
    component: AddProductComponent
  });
  await modal.present();
  modal.onDidDismiss().then(() => this.refresh());
}

}
