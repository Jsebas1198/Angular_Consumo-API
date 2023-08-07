import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product } from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor(private http: HttpClient) {}

  //Trae todos los productos
  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //Trae la información de un producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  //Crea un
  //Le enviamos un DTO, pero cuando responda nos envia un producto
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
}
