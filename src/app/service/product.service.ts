import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly rootUrl = 'https://localhost:7064/api';  // replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Create
  postProduct(product: Product) {
    return this.http.post(this.rootUrl + '/Product', product);
  }

  // Read
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.rootUrl + '/Product');
  }

  // Update
  putProduct(id: number, product: Product) {
    return this.http.put(this.rootUrl + '/Product/' + id, product);
  }

  // Delete
  deleteProduct(id: number) {
    return this.http.delete(this.rootUrl + '/Product/' + id);
  }

}
