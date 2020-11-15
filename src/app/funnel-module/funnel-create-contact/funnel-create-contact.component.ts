import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-funnel-create-contact',
  templateUrl: './funnel-create-contact.component.html',
  styleUrls: ['./funnel-create-contact.component.css']
})
export class FunnelCreateContactComponent implements OnInit {

  public createContactParam: any = {};
  // countries = [{
  //   value: "1",
  //   text: "USA"
  // }]

  // states = [];
  // cities = [];

  name: string;
  public imageSrc: any;
  public loading: boolean = false;
  public blog_id: string;
  public funnels: Array<any> = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getFunnels();
    this.getProfile();

  }

  getProfile() {
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

  // getCountries() {
  //   this.loading = true;
  //   this.api.getCountries(this.auth.getToken())
  //     .subscribe(
  //       data => {
  //         console.log("data is", data)
  //         this.loading = false;
  //         // if (!data.status) {
  //         //   this.toastr.warning(data.msg)
  //         //   return
  //         // }
  //         this.countries = data.data;
  //         return
  //       },
  //       err => {
  //         this.loading = false;
  //         this.toastr.error(err.error.msg)
  //       }
  //     )
  // }
  public getFunnels(): void {
    this.api.getFunnels({}, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.funnels = data.data.data;
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
  // onSelectCountry() {
  //   this.loading = true;
  //   var params = {
  //     "_id": this.createContactParam.contCountry
  //   }
  //   this.api.getStates(params, this.auth.getToken())
  //     .subscribe(
  //       data => {
  //         console.log("data is", data)
  //         this.loading = false;
  //         this.states = data.data;
  //         return
  //       },
  //       err => {
  //         this.loading = false;
  //         this.toastr.error(err.error.msg)
  //       }
  //     )
  // }
  // onSelectStates() {
  //   this.loading = true;
  //   var params = {
  //     "_id": this.createContactParam.contState
  //   }
  //   this.api.getCities(params, this.auth.getToken())
  //     .subscribe(
  //       data => {
  //         console.log("data is", data)
  //         this.loading = false;
  //         this.cities = data.data;
  //         return
  //       },
  //       err => {
  //         this.loading = false;
  //         this.toastr.error(err.error.msg)
  //       }
  //     )
  // }


  onEnterPincode() {
    console.log(this.createContactParam.contPincode);
    if (this.createContactParam.contPincode.length > 4) {
      this.loading = true;
      var params = {
        "zipcodesData": this.createContactParam.contPincode
      }
      this.api.pincodeApi(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            // this.cities = data.data;
            this.createContactParam.contCountry = data.data.country;
            this.createContactParam.contState = data.data.state;
            this.createContactParam.contCity = data.data.city;
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  onSaveContact() {
    console.log(this.createContactParam);

    if (!this.createContactParam.contfirstName)
      this.toastr.warning("Please enter first name.");
    else if (!this.createContactParam.contlastName)
      this.toastr.warning("Please enter last name.");
    else if (!this.createContactParam.contEmail)
      this.toastr.warning("Please enter email id.");
    else if (!this.createContactParam.contPhone)
      this.toastr.warning("Please enter phone number.");
    else if (!this.createContactParam.contAddress1)
      this.toastr.warning("Please enter Address1.");
    else if (!this.createContactParam.contAddress2)
      this.toastr.warning("Please enter Address2.");
    else if (!this.createContactParam.funnelID)
      this.toastr.warning("Please select funnel.");
    else if (!this.createContactParam.contCountry)
      this.toastr.warning("Please select country.");
    else if (!this.createContactParam.contState)
      this.toastr.warning("Please select state.");
    else if (!this.createContactParam.contCity)
      this.toastr.warning("Please select city.");
    else if (!this.createContactParam.contPincode)
      this.toastr.warning("Please enter postal code.");
    else {
      this.loading = true;

      this.api.createFunnelContact(this.createContactParam, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.location.back();
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


  onClear() {
    this.createContactParam = {};
  }
}
