import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  public discount: any = { activeDates: {}, discountType: "0", minRequirementType: "0", minTotal: 0 };
  public loading: boolean = false;
  private shopID: string;
  name: string;
  url : string = this.auth.getShopUrl();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private location: Location) { }

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
        return
      }
    )
  }

  onSave() {
    console.log(this.discount);
    let endDate: Date = new Date(this.discount.activeDates.startTime);
    console.log(endDate.getTime());
    if (!this.discount.discountCode)
      this.toastr.warning("Please enter discount code.");
    else if (!this.discount.discount)
      this.toastr.warning("Please enter discount.");
    else if (this.discount.minTotal === 0 && this.discount.minRequirement === "1")
      this.toastr.warning("Please enter minimum purchase amount.");
    else if (!this.discount.activeDates.startDate)
      this.toastr.warning("Please enter start date.");

    else if (!this.discount.activeDates.endDate)
      this.toastr.warning("Please enter end date.");

    else if (!this.discount.summary)
      this.toastr.warning("Please enter summary.");
    else {
      this.loading = true;
      this.discount.ecommerceSiteId = this.shopID;

      let startDate: Date = new Date(this.discount.activeDates.startDate);
      this.discount.activeDates.startDate = startDate.getTime();
      console.log(startDate.getTime());

      let endDate: Date = new Date(this.discount.activeDates.endDate);

      this.discount.activeDates.endDate = endDate.getTime();
      console.log(endDate.getTime());

      this.api.discountCodeGenerate(this.discount, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          // this.location.back();

          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
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
