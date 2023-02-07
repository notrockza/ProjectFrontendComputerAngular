import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/Models/db';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mtype:any
  MUser:User ={
  titleNavigation:  '',
  FirstName:  '',
  LastName:  '',
  UserEmail: '',
  UserPassword: '',
  Tel: '',
  UserAddress: '',
  }
  constructor(private location: Location, private rest: RestService ,private router:Router) { }
  isError:any
  
  
  ngOnInit(): void {
    this.rest.getTitleProducts().subscribe(data=>{
      this.mtype = data
      console.log(this.mtype)
    })
  }
  onCancel(){
    this.location.back()
  }

  async onSubmit(value: any) {
    try {
      let result = await this.rest.register(value).toPromise()
      if (result.msg == this.rest.OK) {
        // alert('สมัครสำเร็จ')
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })


        // localStorage.setItem(environment.loginResult, this.rest.OK)
        // this.location.back()
        this.isError = null
        this.router.navigate(['login'])
      } else {
        this.isError = result.msg
      }
    } catch (error) {
      this.isError = 'Http Error'
    }
  }
  
}
