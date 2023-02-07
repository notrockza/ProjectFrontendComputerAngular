import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/db';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  mtype:any
  mProduct: Product = {
    id: 1,
    productName: "",
    productPrice: 0,
    idType: "",
    pdStock: 1,
    image: "",
    productDetail: "" ,
    detailSpecifics: "" ,
    upfile: null
  }

  public imageSrc: any = null;
  backendUrl = environment.backendUrl;
  
  constructor(private rest: RestService, private location: Location) { }

  ngOnInit(): void {
    this.rest.getTypeProducts().subscribe(data=>{
      this.mtype = data
      console.log(this.mtype)
    })
  }
  onClickCancel() {
    this.location.back()
  }

  onAddProduct(productForm: any) {
    if (productForm.invalid) return;

    this.rest.addProduct(this.mProduct).subscribe(
      (response) => {
        if (response.msg == this.rest.OK) {
          this.location.back()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.msg,
            footer: '<a href>Why do I have this issue?</a>'
          })
        }

      },
      (error) => {
        alert('Http error')
      }
    )
  }
  onUploadImage(event:any) {
    this.mProduct.upfile = event.target.files[0]; //upload to server

    // Show preview image
    if (this.mProduct.upfile) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mProduct.upfile);
    }
  }
}
