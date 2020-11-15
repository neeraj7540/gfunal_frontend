import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {

  public loading: boolean = false;
  public settingsData: any = {};
  public isDataExist: boolean = false;
  public name: string;
  public _id: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.getSettingsData();
    this.getProfile();
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

  getSettingsData() {
    this.loading = true;
    var params = {
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.getGeneralData(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.isDataExist = true;
          this.settingsData = data.data;
          this._id = data.data._id;
          this.settingsData.emailId = data.data.email;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }

  onSave() {
    console.log(this.settingsData);

    if (!this.settingsData.siteName)
      this.toastr.warning("Please enter site title.");
    else if (!this.settingsData.tagLine)
      this.toastr.warning("Please enter tag line.");
    else if (!this.settingsData.emailId)
      this.toastr.warning("Please enter email id.");
    else if (!this.emailIsValid(this.settingsData.emailId))
      this.toastr.warning("Please enter valid email id.");
    else if (!this.settingsData.siteAddress)
      this.toastr.warning("Please enter website address.");
    else {
      this.loading = true;

      let apiName = "generalSettings";
      if (this.isDataExist)
        apiName = "updateGeneralSettings";

      this.settingsData.blogSiteId = localStorage.getItem("blogId");
      this.settingsData.generalSettingId = this._id;
      this.api.saveOrUpdateSettings(this.settingsData, this.auth.getToken(), apiName).subscribe(
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

  onClear() {
    this.settingsData = {};
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
