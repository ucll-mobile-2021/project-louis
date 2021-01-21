import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {ShoppingListService} from '../../../services/shopping-list.service';

@Component({
    selector: 'app-add-shopping-list-product',
    templateUrl: './add-shopping-list-product.component.html',
    styleUrls: ['./add-shopping-list-product.component.scss'],
})
export class AddShoppingListProductComponent implements OnInit {
    public products: Product[] = [];
    public quantity = 0;
    public selectedProductId: number;

    constructor(private modalController: ModalController,
                private productService: ProductService,
                private shoppingListService: ShoppingListService,
                private toastController: ToastController) {
    }

    public ngOnInit() {
        this.productService.getAll().subscribe(x => this.products = x);
    }

    public dismissModal(): void {
        this.modalController.dismiss();
    }

    public addProduct() {
        if (!this.selectedProductId) {
            const toast = this.toastController.create({
                color: 'danger',
                message: 'Invalid data',
                duration: 2000
            });
            toast.then(x => x.present());
        }
        this.shoppingListService.addProduct(this.selectedProductId).subscribe(() => {
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
