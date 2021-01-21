import {Component} from '@angular/core';
import {Shop} from '../../../models/shop';
import {ModalController, ToastController} from '@ionic/angular';
import {ShopService} from '../../../services/shop.service';

@Component({
    selector: 'app-add-shop',
    templateUrl: './add-shop.component.html',
    styleUrls: ['./add-shop.component.scss'],
})
export class AddShopComponent {
    public shop = new Shop();

    constructor(private modalController: ModalController,
                private shopService: ShopService,
                private toastController: ToastController) {
    }

    public dismissModal(): void {
        this.modalController.dismiss();
    }

    public addShop() {
        this.shopService.create(this.shop).subscribe(() => {
            const toast = this.toastController.create({
                color: 'dark',
                message: 'Saved successfully',
                duration: 2000
            });
            toast.then(x => x.present());
            this.dismissModal();
        },
            () => {
            const toast = this.toastController.create({
                color: 'danger',
                message: 'Invalid data',
                duration: 2000
            });
            toast.then(x => x.present());
            });
    }
}
