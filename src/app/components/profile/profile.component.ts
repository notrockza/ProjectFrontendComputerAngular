import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute,private http:HttpClient) { 
    this.FeedData()

  }
Muser:any
  ngOnInit(): void {
  }

  FeedData(){
    let id = JSON.parse(localStorage.getItem("Userid")!) 
    this.http.get<any>(`https://localhost:44303/ApiUsers/${id}`).subscribe(data=>{
      this.Muser=data
      // alert(JSON.stringify(data))
    })
  
  }

}
