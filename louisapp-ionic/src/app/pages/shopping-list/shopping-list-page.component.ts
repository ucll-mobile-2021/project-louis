import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../services/shopping-list.service';
import {ModalController} from '@ionic/angular';
import {AddShoppingListProductComponent} from './add-shopping-list-product/add-shopping-list-product.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'shopping-list-page.component.html',
    styleUrls: ['shopping-list-page.component.scss']
})
export class ShoppingListPage implements OnInit {
    public ShopItems: ShopItem[] = [];

    constructor(private shoppingListService: ShoppingListService,
                private modalController: ModalController) {
    }

    public ngOnInit(): void {
        this.refresh();
    }

    private refresh(): void {
        this.ShopItems = [];
        this.shoppingListService.getAll().subscribe(result => result[0].products.map(x => {
            if (!this.ShopItems.find(y => y.shopId === x.shop.id)) {
                const shopitem: ShopItem = new ShopItem();
                shopitem.name = x.shop.name;
                shopitem.shopId = x.shop.id;
                this.ShopItems.push(shopitem);
            }
        }));
    }

    async presentAddModal() {
        const modal = await this.modalController.create({
            component: AddShoppingListProductComponent
        });
        await modal.present();
        modal.onDidDismiss().then(() => this.refresh());
    }

}

class ShopItem {
    name: string;
    shopId: number;
}
