import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Shop} from '../models/shop';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends ApiService<Shop> {
  public endpoint = 'shops';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
