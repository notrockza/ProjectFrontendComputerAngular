import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartImg, Products } from 'src/app/Models/db';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  MProduct: any;
  id: any;
  detail: any;
  IdProductsimg!: number;
  dataDetail: any[] = []

  Mcaft:CartImg={
    idProducts: 0,
    productName: '',
    productPrice: 0,
    pdStock: 1,
    userId: 0,
    image: ''
  }
  constructor(private rest: RestService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient ,private Cart:CartService) {
    this.rest.getProducts().subscribe((MProduct: Products[]) => {
      this.MProduct = MProduct;
      console.log(MProduct);
      this.activatedRoute.params.subscribe(async paramsD => {
        let id = paramsD.id
        this.Mcaft.idProducts =  this.id
        console.log("id",this.id)
        this.IdProductsimg = id
        //------------------------------------------------------------------
        this.http.get<any>(`https://localhost:44303/ApiDetailProducts/${id}`).subscribe(reslut => {
          this.dataDetail = reslut
        })
        //------------------------------------------------------------------
        this.MProduct = await this.rest.getProductById(id).toPromise();
      })
    });
    this.feedProducts(this.IdProductsimg)
  }

    ngOnInit(): void {
  
  
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id')
        //console.log('id',this.id)
      })
  
      this.feedImgs()
    }
  
    feedProducts(id: any) {
    }
  
  
    feedImgs() {
      this.rest.getDetailProductById(this.id).subscribe(Response => {
        console.log("img", Response)
        Response.forEach((element: any) => {
          element.image = this.rest.getProductImageUrl(element.image)
        });
        this.detail = Response;
        
      })
    }


    addprocduts(data:any){
      this.Mcaft.productPrice = data.productPrice
      this.Mcaft.productName = data.productName
      this.Mcaft.image = data.image
      this.Mcaft.userId = parseInt(localStorage.getItem("Userid")!)
      console.log(JSON.stringify(this.Mcaft))
      this.Cart.addcart(this.Mcaft)
    }
  }
