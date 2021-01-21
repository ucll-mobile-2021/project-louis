import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {Shop} from '../../models/shop';
import {ModalController} from "@ionic/angular";
import {AddShopComponent} from "./add-shop/add-shop.component";

@Component({
  selector: 'app-tab3',
  templateUrl: 'shops-page.component.html',
  styleUrls: ['shops-page.component.scss']
})
export class ShopsPage implements OnInit {
  public shops: Shop[];

  constructor(private shopService: ShopService,
              private modalController: ModalController) {}

  public ngOnInit() {
    this.refresh();
  }

  private refresh(): void {
    this.shopService.getAll().subscribe(shops => this.shops = shops);
  }

  async presentAddShopModal() {
    const modal = await this.modalController.create({
      component: AddShopComponent
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.refresh());
  }

}
