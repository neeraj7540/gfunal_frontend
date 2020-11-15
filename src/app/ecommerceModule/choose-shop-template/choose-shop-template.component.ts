import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-choose-shop-template',
  templateUrl: './choose-shop-template.component.html',
  styleUrls: ['./choose-shop-template.component.css']
})
export class ChooseShopTemplateComponent implements OnInit {

  name:string;

  constructor(
    private api: ApiService,
    private auth: AuthserviceService

  ) { }

  ngOnInit() {
    this.getProfile(this.auth.getToken());
  }
  getProfile(token:string){
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data=>{
        console.log("data is ", data)
        this.name=data["data"]["first_name"]+" " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err=>{
        console.log("err is", err)
      }
    )
  }

}
