import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'productPrice', 'image', 'productDetail'];
  dataSource: MatTableDataSource<any>;
  productsN: any

  constructor(private rest: RestService) {
    this.productsN = this.feedData()
    this.dataSource = new MatTableDataSource(this.productsN);

  }
  ngOnInit() {
    this.rest.getProducts().subscribe(
      products => {
        this.productsN = products;
        console.log(this.productsN)
      },
      
    );
   }

  public get timestamp(): string {
    return Date.now().toString()
  }

  feedData() {
    this.rest.getProducts()
      .subscribe(data => {
        data.forEach(element => {
          element.image = this.rest.getProductImageUrl(element.image)
        });
        this.productsN = Response;
        console.log('Products', this.productsN)
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })

  }
}
