import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ec-dashboard',
  templateUrl: './ec-dashboard.component.html',
  styleUrls: ['./ec-dashboard.component.css']
})
export class EcDashboardComponent implements OnInit {

  public loading: boolean = false;
  public token: string;
  public shops: Array<any> = []
  public params: any;
  name: string;

  constructor(public auth: AuthserviceService, public api: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.getProfile(this.auth.getToken());
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list'])
        }
        return
      }
    )
  }
  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(
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


  public dashboardData(): void {
    // this.api.blogDashboardData(this.params, this.auth.getToken())
    // .subscribe(
    //   data => {
    //     console.log("data is", data)
    //     if (!data.status) {
    //       // this.toastr.warning(data.msg)
    //       return
    //     }
    //     // this.dashboardDataItems = data.data
    //     return
    //   },
    //   err => {
    //     // this.toastr.error(err.error.msg)
    //   }
    // )
  }
}
