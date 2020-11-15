import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-ec-settings',
  templateUrl: './ec-settings.component.html',
  styleUrls: ['./ec-settings.component.css']
})
export class EcSettingsComponent implements OnInit {

  private shopID: string;
  name:string;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute) { }

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

  openGeneralSettings() {
    this.router.navigate(['/ecommerce/general-settings'], { queryParams: { shopId: this.shopID } });
  }
  openTaxRegion() {
    this.router.navigate(['/ecommerce/tax-regions'], { queryParams: { shopId: this.shopID } });
  }
  openNotifications() {
    this.router.navigate(['/ecommerce/notifications'], { queryParams: { shopId: this.shopID } });
  }
  openShipping() {
    this.router.navigate(['/ecommerce/shipping'], { queryParams: { shopId: this.shopID } });
  }
  // openCheckout() {
  //   this.router.navigate(['/ecommerce/checkout'], { queryParams: { shopId: this.shopID } });
  // }

}
