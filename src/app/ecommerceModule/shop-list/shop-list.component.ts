import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  public loading: boolean = false;
  public token: string;
  public shops: Array<any> = []
  public params: any;
  name: string;
  createdById: string = "";

  constructor(public auth: AuthserviceService, public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.getProfile(this.auth.getToken());
    this.retriveShopList();
  }
  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(data => {
      console.log("data is ", data)
      this.name = data["data"]["first_name"] + " " + data["data"]["last_name"]
      this.auth.sendUserName(this.name);
      this.createdById = data.data._id;
    },
      err => {
        console.log("err is", err)
      }
    )
  }
  public retriveShopList(): void {
    this.token = this.auth.getToken()
    this.params = {
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getShopList(this.params, this.token).subscribe(data => {
      if (data.status) {
        var exceljsonobj = [];
        for (var v in data.data) {
          var Url = "http://35.173.122.237:8080/ecom-dash-dashboard?id=" + data.data[v]._id + "&createdById=" + this.createdById;

          exceljsonobj.push({
            "_id" : data.data[v]._id,
            "shopName": data.data[v].shopName,
            "url": Url
          });
        }
        this.shops = exceljsonobj;
        console.log("ecommerece list: ", this.shops);
      }
      this.loading = false;
      return;
    },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  onManage(e) {
    localStorage.setItem("shopName", e.shopName);
    localStorage.setItem("shopId", e._id);
    this.auth.sendShopUrl(e.url);      
    this.router.navigate(['/ecommerce/dashboard'], { queryParams: { shopId: e._id } });
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  onPreview(shop: any) {
    // this.router.navigate(['blogtemplate1'], { queryParams: { blogId: blog._id } })
  }
  public openShopCategory(): void {
    this.router.navigate(['/ecommerce/shop-template-categories'])
  }

}
