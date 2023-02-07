import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  Logout(){
    localStorage.removeItem(environment.loginResult);
    localStorage.removeItem("Userid");
    localStorage.clear()
    this.router.navigate(["login"])
  }
}
