import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../services/shop.service';
import { ShoppingListProductResponse, ShoppingListService } from '../../../services/shopping-list.service';
import { Shop } from '../../../models/shop';
import {
    Environment,
    Geocoder,
    GeocoderResult,
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    Marker
} from '@ionic-native/google-maps';
import { environment } from '../../../../environments/environment';
import { forkJoin, from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-shop-list-page',
    templateUrl: './shop-list-page.component.html',
    styleUrls: ['./shop-list-page.component.scss'],
    providers: [Geolocation]
})
export class ShopListPageComponent implements OnInit {
    public addressNotFound = true;
    public map: GoogleMap;
    private shopId: number;
    public shop: Shop;
    public currentError = '';
    public products: ShoppingListProductResponse[] = [];
    public distance: string;

    constructor(private router: ActivatedRoute,
        private shopService: ShopService,
        private shoppingListService: ShoppingListService,
        private toastController: ToastController,
        private geolocation: Geolocation,
        private httpClient: HttpClient) {
        // Environment.setEnv({
        //     API_KEY_FOR_BROWSER_RELEASE: environment.mapsKey,
        //     API_KEY_FOR_BROWSER_DEBUG: environment.mapsKey,
        // });
    }

    public ngOnInit() {
        this.refresh();
    }

    public refresh(): void {
        this.shopId = this.router.snapshot.params.id;
        this.shopService.get(this.shopId).subscribe(x => {
            this.shop = x;
            // this.loadMap(this.shop.name, x.address);
            this.loadPosition();
        });
        this.shoppingListService.getAll().subscribe(x => {
            this.products = x[0].products.filter(y => Number(y.shop.id) === Number(this.shopId));
        });
    }

    public loadPosition(): void {
        forkJoin({
            currentPosition: this.geolocation.getCurrentPosition(),
            shopPosition: this.httpClient.get(`https://nominatim.openstreetmap.org/search?format=json&q=${JSON.stringify(this.shop.address)}`)
        })
        .subscribe((resp) => {
            this.distance = this.calcCrow(resp.currentPosition.coords.latitude, resp.currentPosition.coords.longitude, resp.shopPosition[0]?.lat, resp.shopPosition[0]?.lon).toFixed().toString();
            console.log(resp);
        });
    }

    public number(val: any): number {
        return Number(val);
    }

    public loadMap(shopName: string, address: string): void {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: environment.mapsKey,
            API_KEY_FOR_BROWSER_DEBUG: environment.mapsKey,
        });
        from(Geocoder.geocode({ address })).subscribe((x) => {
            console.log('address', x);
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

        }, (c) => this.currentError = JSON.stringify(c));
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

    public calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const latOne = this.toRad(lat1);
        const latTwo = this.toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latOne) * Math.cos(latTwo);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    public toRad(value: number): number {
        return value * Math.PI / 180;
    }
}

class LatLong {
    public;
}
