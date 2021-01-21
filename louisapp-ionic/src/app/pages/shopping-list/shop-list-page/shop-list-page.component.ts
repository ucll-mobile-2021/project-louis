import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShopService} from '../../../services/shop.service';
import {ShoppingListProductResponse, ShoppingListService} from '../../../services/shopping-list.service';
import {Shop} from '../../../models/shop';
import {
    Environment,
    Geocoder,
    GeocoderResult,
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    Marker
} from '@ionic-native/google-maps';
import {environment} from '../../../../environments/environment';
import {from} from 'rxjs';
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-shop-list-page',
    templateUrl: './shop-list-page.component.html',
    styleUrls: ['./shop-list-page.component.scss'],
})
export class ShopListPageComponent implements OnInit {
    public addressNotFound = true;
    public map: GoogleMap;
    private shopId: number;
    public shop: Shop;
    public products: ShoppingListProductResponse[] = [];

    constructor(private router: ActivatedRoute,
                private shopService: ShopService,
                private shoppingListService: ShoppingListService,
                private toastController: ToastController) {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: environment.mapsKey,
            API_KEY_FOR_BROWSER_DEBUG: environment.mapsKey,
        });
    }

    public ngOnInit() {
        this.refresh();
    }

    public refresh(): void {
        this.shopId = this.router.snapshot.params.id;
        this.shopService.get(this.shopId).subscribe(x => {
            this.shop = x;
            this.loadMap(this.shop.name, x.address);
        });
        this.shoppingListService.getAll().subscribe(x => {
            this.products = x[0].products.filter(y => Number(y.shop.id) === Number(this.shopId));
        });
    }

    public loadMap(shopName: string, address: string): void {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: environment.mapsKey,
            API_KEY_FOR_BROWSER_DEBUG: environment.mapsKey,
        });
        from(Geocoder.geocode({address})).subscribe((x) => {
            if ((x as GeocoderResult[]).length > 0) {
                this.addressNotFound = false;
            }
            const mapOptions: GoogleMapOptions = {
                camera: {
                    target: {
                        lat: x[0].position.lat,
                        lng: x[0].position.lng
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            this.map = GoogleMaps.create('map_canvas', mapOptions);

            const marker: Marker = this.map.addMarkerSync({
                title: shopName,
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: x[0].position.lat,
                    lng: x[0].position.lng
                }
            });

        });
    }

    doRefresh($event: any) {
        this.refresh();
        $event.target.complete();
    }

    deleteProduct(id: number) {
        this.shoppingListService.deleteProduct(id).subscribe(() => {
                this.refresh();
                const toast = this.toastController.create({
                    color: 'dark',
                    message: 'Deleted successfully',
                    duration: 2000
                });
                toast.then(x => x.present());
            },
            () => {
                const toast = this.toastController.create({
                    color: 'danger',
                    message: 'Cannot delete',
                    duration: 2000
                });
                toast.then(x => x.present());
            });
    }
}

class LatLong {
    public;
}
