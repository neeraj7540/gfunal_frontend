import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  public shopID: string;
  public loading: boolean = false;
  public collections: Array<any> = [];
  name: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getCollections();
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


  getCollections() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 100
    }
    this.api.getCollections(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          // let dasta = data.map(res => res.data.json());
          console.log(data);

          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          // this.toastr.success(data.msg);
          // this.collections = data.data;
          this.collections = data.data;


          // foreach(let collection in this.collections){

          // }

          for (let i = 0; i < this.collections.length; i++) {
            const myObjStr = JSON.parse(this.collections[i].collectionImage);
            this.collections[i].collectionImage = myObjStr.data.Location

          }
          console.log(this.collections)
          // const myObjStr = JSON.parse(data.data.collectionImage);
          // console.log(myObjStr)
          // this.collections.collectionImage = myObjStr.data.Location;

          return
        },
        err => {
          this.loading = false;
          // this.toastr.error(err.error.msg)
        }
      )
  }


  editCollection(collection: any) {
    if (confirm("Are you sure you want to edit this collection?")) {
      this.router.navigate(['/ecommerce/create-collection'], { queryParams: { shopId: this.shopID, id: collection._id } })
    }
  }

  deleteCollection(collection: any, index) {
    if (confirm("Are you sure to delete this collection?")) {
      this.loading = true;

      var params = {
        "ecommerceSiteId": this.shopID,
        "collectionId": collection._id
      }
      this.api.deleteCollection(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.collections.splice(index, 1);
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  openCreateCollection() {
    this.router.navigate(['/ecommerce/create-collection'], { queryParams: { shopId: this.shopID } });
  }

  public check(): boolean {
    if (this.loading) 
      return true
    else 
      return false
  }
}
