import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ImgDetail } from 'src/app/Models/db';
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products-detail',
  templateUrl: './admin-products-detail.component.html',
  styleUrls: ['./admin-products-detail.component.css']
})

export class AdminProductsDetailComponent implements OnInit {
  id:any;
  mDetailProducts:ImgDetail={
    upfile:[]
  }

  imageSrc: any 
  
  constructor(private activatedRoute: ActivatedRoute, private rest: RestService, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) =>{
      this.id = params.get('id')
    })
  }

  onAddDetailProducts(Form:any){
    if (Form.invalid) return;
    this.mDetailProducts.idProductsDetails = this.id;
    console.log(this.mDetailProducts)
    console.log(this.mDetailProducts.upfile)
    this.rest.addDetailProcuts(this.mDetailProducts).subscribe(
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
  onClickCancel() {
    this.location.back()
  }

  onUploadImage(event:any){
    for(let i of event.target.files){
      this.mDetailProducts.upfile.push(i)
    }
    console.log(this.mDetailProducts.upfile)
    
  }

  public get timestamp(): string {
    return Date.now().toString()
  }
}










  // onAddDetailFurniture(Form:any){
  //   if (Form.invalid) return;
  //   this.mDetailFurnitures.proId = this.id;
  //   console.log(this.mDetailFurnitures)
  //   console.log(this.mDetailFurnitures.upfile)
  //   this.rest.addDetailFurniture(this.mDetailFurnitures).subscribe(
  //     (response) => {
  //       if (response.msg == this.rest.OK) {
  //         this.location.back()
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: response.msg,
  //           footer: '<a href>Why do I have this issue?</a>'
  //         })
  //       } 
  //     },
  //     (error) => {
  //       alert('Http error')
  //     }
  //   )
  // }
  