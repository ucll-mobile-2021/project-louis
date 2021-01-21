import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends ApiService<Product> {
    public endpoint = 'products';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

}
