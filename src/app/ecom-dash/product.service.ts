import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  saveProduct(product: any) {
    localStorage.setItem("product", JSON.stringify(product));
  }

  getProductt(): any {
    return JSON.parse(localStorage.getItem("product"));
  }
}
