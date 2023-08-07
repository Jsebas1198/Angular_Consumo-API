import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'https://api.escuelajs.co/api/v1/products';
  constructor(private http: HttpClient) {}

  //Trae todos los productos
  getAllProducts() {
    return this.http.get<Product[]>(this.url);
  }

  //Trae la información de un producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
