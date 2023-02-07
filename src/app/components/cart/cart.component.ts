import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dataCart:any;
  total!: number;
  constructor(private http:HttpClient) {
    this.dataCart=JSON.parse(localStorage.getItem("cart")!)
    console.log(this.dataCart)
    this.feedtotal()
   }
  ngOnInit(): void {
  }

  feedtotal() {
    const form = new FormData();
    for (let i = 0; i < this.dataCart.length; i++) {
      form.append("number",`${this.dataCart[i].pdStock}`);
      form.append("price", `${this.dataCart[i].productPrice}`);
    }
    this.http.post<any>(`https://localhost:44303/ApiOrder`, form).subscribe(data => {
      this.total = data
    })
  }

}


