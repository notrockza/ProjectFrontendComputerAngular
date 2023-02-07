import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/db';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  mtype:any
  mProduct!: Product

  public imageSrc: any = null;
  backendUrl = environment.backendUrl;

  constructor(private activatedRoute: ActivatedRoute,
    private rest: RestService, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      this.mProduct = await this.rest.getProductById(id).toPromise();
    })
    this.rest.getTypeProducts().subscribe(data=>{
      this.mtype = data
      console.log(this.mtype)
    })
  }

  onClickCancel() {
    this.location.back()
  }

  onEditProduct(productForm: any) {

    if (productForm.invalid) return

    this.rest.updateProduct(this.mProduct).subscribe(
      (response) => {
        if (response.msg == this.rest.OK) {
          this.location.back()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      },
      (error) => {
        alert('Http Error')
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

  public get timestamp(): string {
    return Date.now().toString()
  }
}
