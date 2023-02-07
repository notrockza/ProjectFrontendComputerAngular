import { AfterViewInit,Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from 'chart.js';
import { Stock } from 'src/app/Models/db';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'productName','productPrice','pdStock','image','productDetail','detailSpecifics','idTypeNavigation.typeName','aciton'];
  dataSource: MatTableDataSource<any>;
  products: any
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rest: RestService) {
    this.products = this.feedData()
    console.log(this.products)
    this.dataSource = new MatTableDataSource(this.products);
  }

  addId(id:number){
    this.mStock.idProduct = id;
    console.log("id",id)
  }
  mStock:Stock={
    stockDate:Date.now().toString()
  }

  addStock(Form:any){
    console.log("FormStock",this.mStock) 
    this.rest.addStock(this.mStock).subscribe(response=>{
      console.log('response',response)

      this.rest.getProductById(this.mStock.idProduct).subscribe(Element=>{ 
        Element.pdStock += this.mStock.stock1;
        console.log(Element)
        this.rest.putproduct(Element).subscribe(response=>{
          if(response.msg=="OK"){console.log("UpdateStock Success")}
          this.feedData()
        })
        this.mStock={stockDate:Date.now().toString()}
      })
      
    }) 
  }

  feedData() { 
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.rest.getProducts()
      .subscribe(data => {
        console.log(data)
        data.map(item => item.image = this.rest.getProductImageUrl(item.image))
        this.dataSource.data = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public get timestamp(): string {
    return Date.now().toString()
  }

  onDelete(id:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.rest.deleteProduct(id).toPromise();
        this.feedData()
      }
    })
  }
}
