import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class StaticProductService {
  products: IProduct[];
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Wireless Mouse',
        price: 25.99,
        quantity: 10,
      },
      {
        id: 2,
        name: 'Keyboard',
        price: 45.0,
        quantity: 7,
      },
      {
        id: 3,
        name: 'Laptop Stand',
        price: 30.5,
        quantity: 15,
      },
      {
        id: 4,
        name: 'USB-C Hub',
        price: 20.0,
        quantity: 5,
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        price: 60.99,
        quantity: 8,
      },
    ];
  }
  // get all products
  getAllProducts(): IProduct[] {
    return this.products;
  }
  // add product
  addProduct(product: IProduct): void {
    this.products.push(product);
    console.log('ADD', this.products);
  }
  // delete
  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }
  // get product by id
  getProductByID(id: number): IProduct {
    return this.products[id];
  }
  // edit product
  editProduct(productId: number, product: IProduct): void {
    this.products = this.products.map((item) => {
      if (item.id == productId) {
        item.name = product.name;
        item.price = product.price;
        item.quantity = product.quantity;
      }
      return item;
    });
  }
}
