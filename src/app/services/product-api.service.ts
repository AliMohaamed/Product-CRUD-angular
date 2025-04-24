import { IProduct } from './../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  baseURL: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL);
  }

  getProductById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseURL}/${productId}`);
  }

  addProduct(product: any): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseURL, product);
  }

  editProduct(productId: string, product: any): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseURL}/${productId}`, product);
  }
  deleteProduct(productId: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseURL}/${productId}`);
  }
}
