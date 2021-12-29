import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { products } from "../products";


@Injectable()
export class ProductService{

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    // return products
    return this.http.get('/api/v1/products/')
    // return this.http.get('http://localhost:3001/api/v1/products/')
  }

  getProductById(productId: String): Observable<any>{
    return this.http.get('/api/v1/products/' + productId)
    // return products[productId]
  }
}