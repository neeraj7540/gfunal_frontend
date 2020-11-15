import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ec-footer',
  templateUrl: './ec-footer.component.html',
  styleUrls: ['./ec-footer.component.css']
})
export class EcFooterComponent implements OnInit {


  public footer: any = {};
  public loading: boolean = false;
  private shopID: string;
  public existedFooterId: string;
  name: string;

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
        this.getFooterData();
        return
      }
    )
  }
  getFooterData() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID
    }
    this.api.getFooterData(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        // this.toastr.success(data.msg);
        this.footer = data.data;
        this.existedFooterId = data.data._id;
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)


      })
  }
  onSubmit() {
    if (!this.footer.name)
      this.toastr.warning("Please enter name.");
    else if (!this.footer.emailInput)
      this.toastr.warning("Please enter email.");
    else if (!this.footer.phoneNumber)
      this.toastr.warning("Please enter phone number.");
    else if (!this.footer.message)
      this.toastr.warning("Please enter message.");
    else if (!this.footer.returnPolicy)
      this.toastr.warning("Please enter return policy.");
    else if (!this.footer.termsAndCondition)
      this.toastr.warning("Please enter terms and conditions.");
    else {
      this.loading = true;
      this.footer.ecommerceSiteId = this.shopID;
      this.api.saveFooterData(this.footer, this.auth.getToken()).subscribe(
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

  onUpdate() {
    if (!this.footer.name)
      this.toastr.warning("Please enter name.");
    else if (!this.footer.emailInput)
      this.toastr.warning("Please enter email.");
    else if (!this.footer.phoneNumber)
      this.toastr.warning("Please enter phone number.");
    else if (!this.footer.message)
      this.toastr.warning("Please enter message.");
    else if (!this.footer.returnPolicy)
      this.toastr.warning("Please enter return policy.");
    else if (!this.footer.termsAndCondition)
      this.toastr.warning("Please enter terms and conditions.");
    else {
      this.loading = true;

      let params = {
        "ecommerceSiteId": this.shopID,
        "ecommerceFooterId": this.existedFooterId,
        "newName": this.footer.name,
        "newEmailInput": this.footer.emailInput,
        "newPhoneNumber": this.footer.phoneNumber,
        "newMessage": this.footer.message,
        "newReturnPolicy": this.footer.returnPolicy,
        "newTermsAndCondition": this.footer.termsAndCondition
      }
      this.api.updateFooterData(params, this.auth.getToken()).subscribe(
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
