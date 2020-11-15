import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ec-header',
  templateUrl: './ec-header.component.html',
  styleUrls: ['./ec-header.component.css']
})
export class EcHeaderComponent implements OnInit {


  public ecommerceHeader: any = {};
  public loading: boolean = false;
  public isHeaderDataExist: boolean = false;
  public existedHeaderId: string = "";
  public name: string;
  public shopID: string;

  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.checkQueryIsAvailable();
    // var shopId = localStorage.getItem("shopId");
    this.getProfile();
  }


  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        this.getShopHeader(data.shopId);
        return
      }
    )
  }

  getProfile() {
    console.log("its called")
    this.api.getProfile(this.auth.getToken()).subscribe(
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

  getShopHeader(_id: string) {
    this.loading = true;
    var params = {
      "ecommerceSiteId": _id
    }
    this.api.getShopHeaderData(params, this.auth.getToken()).subscribe(data => {
          this.loading = false;
          console.log("Header data is", data)
          if (!data.status) {
            this.isHeaderDataExist = false;
            this.toastr.warning(data.msg)
            return
          }
          this.isHeaderDataExist = true;
          this.existedHeaderId = data.data._id;
          this.ecommerceHeader = data.data;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      this.ecommerceHeader.logo = file;
      reader.onload = () => {
        this.ecommerceHeader.ecommerceLogo = reader.result
        console.log(this.ecommerceHeader.ecommerceLogo);
      };
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    //  alert(this.ecommerceHeader.shopLogo)
    this.ecommerceHeader.shopLogo = "";
  }
  public saveHeader(): void {


    console.log(this.ecommerceHeader);
    if (!this.ecommerceHeader.ecommerceName)
      this.toastr.warning("Please enter shop name.");
    else if (!this.ecommerceHeader.headerCustomText)
      this.toastr.warning("Please enter header custom text.");
    else if (!this.ecommerceHeader.ecommerceLogo)
      this.toastr.warning("Please select shop logo.");
    else {

      this.loading = true;
      this.ecommerceHeader.socialNetWorks = "socialNetWorks";
      this.ecommerceHeader.ecommerceSiteId = this.shopID;
      var apiName = "headerOfEcommerce";

      const formData = new FormData();
      formData.append('ecommerceName', this.ecommerceHeader.ecommerceName);
      formData.append('headerCustomText', this.ecommerceHeader.headerCustomText);
      formData.append('ecommerceLogo', this.ecommerceHeader.logo);
      formData.append('socialNetWorks', "socialNetWorks");
      formData.append('ecommerceSiteId', this.shopID);

      formData.append('fb_link', this.ecommerceHeader.fb_link);
      formData.append('tw_link', this.ecommerceHeader.tw_link);
      formData.append('yt_link', this.ecommerceHeader.yt_link);
      formData.append('ld_link', this.ecommerceHeader.ld_link);
      formData.append('ig_link', this.ecommerceHeader.ig_link);
      formData.append('pt_link', this.ecommerceHeader.pt_link);


      if (this.isHeaderDataExist) {
        apiName = "updateEcommerceHeader";
        this.ecommerceHeader.ecommerceHeaderid = this.existedHeaderId;
        formData.append('ecommerceHeaderid', this.existedHeaderId);
      }

      this.api.saveOrUpdateHeader(formData, this.auth.getToken(), apiName).subscribe(
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
