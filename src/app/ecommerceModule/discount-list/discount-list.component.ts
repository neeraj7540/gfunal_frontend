import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  public discounts: Array<any> = [];
  public loading: boolean = false;
  private shopID: string;
  name: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getProfile(this.auth.getToken());
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


  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        this.getDiscounts();
        return
      }
    )
  }


  getDiscounts() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getDiscounts(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          this.discounts = data.data;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }



  openAddDiscount(){

    this.router.navigate(['/ecommerce/discounts'], { queryParams: { shopId: this.shopID } });
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
