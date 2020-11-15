import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-funnel-dashboard',
  templateUrl: './funnel-dashboard.component.html',
  styleUrls: ['./funnel-dashboard.component.css']
})
export class FunnelDashboardComponent implements OnInit {


  public dashboardDataItems: any = {};
  name: string;
  public loading: boolean = false;
  public funnelCount: string;
  public funnelPageCount: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getFunnelCount();
    this.getFunnelPageCount();
    this.getProfile(this.auth.getToken());
  }


  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }


  public getFunnelCount(): void {
    var params = {};
    this.api.getFunnelCount(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.funnelCount = data.data;
          return
        }
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }


  public getFunnelPageCount(): void {
    var params = {};
    this.api.getFunnelPageCount(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.funnelPageCount = data.data;
          return
        }
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }
  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }
}
