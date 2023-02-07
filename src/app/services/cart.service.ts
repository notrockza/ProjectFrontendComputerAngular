import { Injectable } from '@angular/core';
import { CartImg } from '../Models/db';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  produtcart: CartImg[] = []
  constructor() { }

  addcart(data: any) {
    this.produtcart.push(data)
    localStorage.setItem("cart", JSON.stringify(this.produtcart))
  }
}
