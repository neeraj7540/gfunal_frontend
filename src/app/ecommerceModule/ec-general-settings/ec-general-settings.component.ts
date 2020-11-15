import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ec-general-settings',
  templateUrl: './ec-general-settings.component.html',
  styleUrls: ['./ec-general-settings.component.css']
})
export class EcGeneralSettingsComponent implements OnInit {

  public settings: any = {};
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
        this.getSettingsData();
        return
      }
    )
  }
  getSettingsData() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID
    }
    this.api.getGeneralSettings(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        this.settings = data.data;
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }
  onUpdate() {
    if (!this.settings.shopName)
      this.toastr.warning("Please enter shop name.");
    // else if (!this.settings.accountEmail)
    //   this.toastr.warning("Please enter account email.");
    else if (!this.settings.customerEmail)
      this.toastr.warning("Please enter customer email.");
    // else if(!this.isEmailValid(this.settings.accountEmail))
    //   this.toastr.warning("Please enter valid account email.");
    else if(!this.isEmailValid(this.settings.customerEmail))
      this.toastr.warning("Please enter valid customer email.");  
    else {
      this.loading = true;
      this.settings.ecommerceSiteId = this.shopID;
      this.api.updateGeneralSettings(this.settings, this.auth.getToken()).subscribe(
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

  isEmailValid(email:string):boolean
  {
      var  serchfind:boolean;
      var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      serchfind = regexp.test(email);
      return serchfind
  }
}
