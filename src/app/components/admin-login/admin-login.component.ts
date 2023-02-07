import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, private rest: RestService) { }
  isError: any


  ngOnInit(): void {
    if (this.rest.isLoggedIn()) {
      this.router.navigate(["login"])
    }
  }
  // result.data.AdminNme
  async onSubmit(value: any) {
    try {
      let result = await this.rest.adminlogin(value).toPromise()
      if (result.msg == this.rest.OKS) {
        localStorage.setItem(environment.loginResult, this.rest.OKS)
        this.isError = null
        this.router.navigate(["index"])
      } else {
        this.isError = result.msg
      }
    } catch (error) {
      this.isError = 'Http Error'
    }
  }
}





