import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ec-page',
  templateUrl: './ec-page.component.html',
  styleUrls: ['./ec-page.component.css']
})
export class EcPageComponent implements OnInit {


  name: string;
  public loading: boolean = false;
  public token: string;
  public pagesData: Array<any> = []
  public params: any;
  private shopID: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();
    this.getProfile();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        this.retrivePageList();
        return
      }
    )
  }

  getProfile() {
    console.log("its called")
    this.api.getProfile(this.auth.getToken()).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }

  public retrivePageList(): void {
    this.token = this.auth.getToken()
    this.params = {
      "startingValue": 0,
      "lastValue": 500,
      "ecommerceSiteId": this.shopID
    }

    this.api.pageSiteList(this.params, this.token).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.pagesData = data.data
          return
        }
        return
      },
      err => {
        console.log(err)
        this.loading = false;
        return
      }
    )
  }
  public addNewPage(): void {
    this.router.navigate(['/ecommerce/add-page'], { queryParams: { shopId: this.shopID } })
  }


  onEdit(_id: string) {
    this.router.navigate(['/ecommerce/add-page'], { queryParams: { pageId: _id, shopId: this.shopID } })
  }

  onDelete(page, index) {
    if (confirm("Are you sure to delete this page?")) {
      this.loading = true;

      var params = {
        "ecommercePageID": page._id,
        "ecommerceSiteId": this.shopID
      }
      this.api.deletePageSite(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.pagesData.splice(index, 1);
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
