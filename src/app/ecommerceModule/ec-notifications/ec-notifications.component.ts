import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ec-notifications',
  templateUrl: './ec-notifications.component.html',
  styleUrls: ['./ec-notifications.component.css']
})
export class EcNotificationsComponent implements OnInit {

  public notification: any = {};
  public loading: boolean = false;
  private shopID: string;
  name:string;

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
        this.getNotificationsData();
        return
      }
    )
  }
  getNotificationsData() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID
    }
    this.api.getNotifications(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        this.notification = data.data;
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }
  onSaveSettings() {
    if (!this.notification.orderConfirmation)
      this.toastr.warning("Please enter order confirmation message.");
    else if (!this.notification.orderCanceled)
      this.toastr.warning("Please enter order canceled message.");
    else if (!this.notification.orderRefund)
      this.toastr.warning("Please enter order refund message.");
    else if (!this.notification.shippingConfirmation)
      this.toastr.warning("Please enter order shipping confirmation message.");
    else if (!this.notification.shippingDelivered)
      this.toastr.warning("Please enter order shipping delivered message.");
    else {
      this.loading = true;
      this.notification.ecommerceSiteId = this.shopID;
      this.api.saveNotifications(this.notification, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
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
