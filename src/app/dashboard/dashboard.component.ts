import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import {ApiService} from './../api.service'
import {AuthserviceService} from '../authservice.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name:string;
  token:string = this.auth.getToken()
  constructor(
    private apiService: ApiService,
    private auth: AuthserviceService
  ) { }


  ngOnInit() {
    this.getProfile(this.token)
  }

  getProfile(token:string){
    console.log("its called")
    this.apiService.getProfile(token).subscribe(
      data=>{
        console.log("data is ", data)
        this.name = data["data"]["first_name"]+" " + data["data"]["last_name"]
        this.auth.sendUserName(this.name);
      },
      err=>{
        console.log("err is", err)
      }
    )
  }
}
