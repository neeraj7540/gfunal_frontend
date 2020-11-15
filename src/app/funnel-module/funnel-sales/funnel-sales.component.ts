import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-funnel-sales',
  templateUrl: './funnel-sales.component.html',
  styleUrls: ['./funnel-sales.component.css']
})
export class FunnelSalesComponent implements OnInit {

  public receivedData: Array<any>;
  name :string;
  constructor(public auth: AuthserviceService, public api: ApiService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.api.getProfile(this.auth.getToken()).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"]
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }

  check() {

  }

}
