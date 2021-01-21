import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends ApiService<ShoppingListResponse> {
  public endpoint = 'shopping-lists';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public addProduct(productId: number): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.endpoint}/add_product/`, { productId });
  }

  public deleteProduct(productId: number): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.endpoint}/delete_product/`, { productId });
  }
}

export class ShoppingListResponse {
  public id: number;
  public products: ShoppingListProductResponse[];
}
export class ShoppingListProductResponse {
  public id: number;
  public name: string;
  public shop: ShoppingListShopResponse;
}
export class ShoppingListShopResponse {
  public id: number;
  public name: string;
}
