import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ShopService } from '../../../services/shop.service';
import { Shop } from '../../../models/shop';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    providers: [Camera]
})
export class AddProductComponent implements OnInit {
    public product = new Product();
    public shops: Shop[] = [];
    public isPictureTaken = false;
    public imageData: string;


    constructor(private modalController: ModalController,
        private productService: ProductService,
        private toastController: ToastController,
        private shopService: ShopService,
        private camera: Camera) {
    }

    public ngOnInit() {
        this.shopService.getAll().subscribe(shops => this.shops = shops);
    }

    public dismissModal(): void {
        this.modalController.dismiss();
    }

    public takePicture(): void {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            if (imageData) {
                this.imageData = 'data:image/jpeg;base64,' + imageData;
            }
            this.isPictureTaken = true;
        }, (err) => {
            // Handle error
        });
    }

    public addProduct() {
        this.productService.create(this.product).subscribe(() => {
            localStorage.setItem(this.product.name, this.imageData);
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
