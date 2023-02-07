import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Products } from 'src/app/Models/db';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products-detail-img',
  templateUrl: './admin-products-detail-img.component.html',
  styleUrls: ['./admin-products-detail-img.component.css']
})
export class AdminProductsDetailImgComponent implements OnInit {


  displayedColumns: string[] = ['image', 'action',];
  dataSource = new MatTableDataSource()

  productB:any;
  id: any;
  IdProdcuts!: number
  dataprodcuts: any[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  public imageSrc: any = null;
  backendUrl = environment.backendUrl;

  
  constructor(private rest: RestService, private router: Router,private activatedRoute: ActivatedRoute,private http: HttpClient) {
    this.rest.getProducts().subscribe((productsB: Products[]) => {
      this.productB = productsB;
      console.log(this.productB);
      this.activatedRoute.params.subscribe(async paramsD => {
        let id = paramsD.id
        this.IdProdcuts = id
        //------------------------------------------------------------------
        this.http.get<any>(`https://localhost:44303/ApiDetailProducts/${id}`).subscribe(reslut => {
          this.dataprodcuts = reslut
        })
        //------------------------------------------------------------------
        this.productB = await this.rest.getProductById(id).toPromise();
      })
    });
    this.feedProducts(this.IdProdcuts);
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    });
  }


  feedProducts(id: any) {
    this.rest.getProducts()
      .subscribe(data => {
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


      deleteDetailProdcuts(id: any) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.rest.DeleteDetailProduct(id).toPromise();
            
          }
        })
      }

      public get timestamp(): string {
        return Date.now().toString()
      }


}






   
 

   
   

 
  

