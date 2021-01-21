import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {ShopService} from '../../../services/shop.service';
import {Shop} from '../../../models/shop';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    public product = new Product();
    public shops: Shop[] = [];

    constructor(private modalController: ModalController,
                private productService: ProductService,
                private toastController: ToastController,
                private shopService: ShopService) {
    }

    public ngOnInit() {
        this.shopService.getAll().subscribe(shops => this.shops = shops);
    }

    public dismissModal(): void {
        this.modalController.dismiss();
    }

    public addProduct() {
        this.productService.create(this.product).subscribe(() => {
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
