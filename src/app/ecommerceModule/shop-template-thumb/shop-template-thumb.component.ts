import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-template-thumb',
  templateUrl: './shop-template-thumb.component.html',
  styleUrls: ['./shop-template-thumb.component.css']
})
export class ShopTemplateThumbComponent implements OnInit {

  @Input() temp_name;
  @ViewChild('storeCreate',{static: false}) storeCreateModal: any;

  public storename: string;
  public params: any;
  public category: string;
  name: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
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
        if (!data.shopCategory) {
          return this.router.navigate(['/dashboard'])
        }
        this.category = data.shopCategory;
        return
      }
    )
  }

  public previewTemplate(): void {
    alert(this.temp_name)
  }

  public createStore(): void {


    if (!this.storename) {
      this.toastr.warning("Please enter Store name.");
    }
    else {

      this.params = {
        "shopName": this.storename,
        "shopTemplateCategory": this.category,
        "shopTemplateType": this.temp_name
      }

      this.api.createShop(this.params, this.auth.getToken()).subscribe(
        data => {
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.storeCreateModal.hide();
          this.toastr.success(data.msg)
          this.router.navigate(['/ecommerce/shop-list']);
          return
        },
        err => {
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

}
