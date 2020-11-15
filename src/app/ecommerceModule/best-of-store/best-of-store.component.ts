import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-best-of-store',
  templateUrl: './best-of-store.component.html',
  styleUrls: ['./best-of-store.component.css']
})
export class BestOfStoreComponent implements OnInit {

  public bestStore: any = {};
  public loading: boolean;
  private shopID: string;
  public bestStoreId: string;
  name: string;
  public collections: Array<any> = [];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getBestStoreData();
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
        this.getCollectionsList();
        return
      }
    )
  }

  getCollectionsList() {
    this.loading = true;
    var params = {
      "startingValue": 0,
      "lastValue": 500,
      "ecommerceSiteId": this.shopID
    }
    this.api.getCollections(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;

        if (!data.status) {
          this.toastr.warning(data.msg)
          return
        }
        this.collections = data.data;
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
  }

  getBestStoreData() {
    this.loading = true;
    let params = {
      "ecommerceSiteId": this.shopID
    };
    this.api.getBestStoreData(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg)
          return
        }
        this.bestStore = data.data;
        this.bestStoreId = data.data._id;
        this.toastr.success(data.msg);
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
  }

  onSave() {

    if (!this.bestStore.heading)
      this.toastr.warning("Please enter heading.");
    else if (!this.bestStore.storeCollection)
      this.toastr.warning("Please select collection.");
    // else if (!this.bestStore.productRows)
    //   this.toastr.warning("Please select product rows.");
    // else if (!this.bestStore.productsPerRow)
    //   this.toastr.warning("Please enter product per row.");
    else {
      this.loading = true;
      this.bestStore.ecommerceSiteId = this.shopID;
      let apiName = "createBesOfStore";
      if (this.bestStoreId) {
        apiName = "updateBestOfStore";
        this.bestStore.bestOfStoreId = this.bestStoreId;
      }
      this.api.saveUpdateBestStore(this.bestStore, this.auth.getToken(), apiName).subscribe(
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

}
