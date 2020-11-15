import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css']
})
export class CourseSettingsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  userName: string = this.auth.getUserName();

  name: string = "";
  biography: string = "";
  url: string = "";
  twitter: string = "";
  facebook: string = "";
  linkDin: string = "";
  youTube: string = "";

  imgURL: any = "../assets/images/upload-icon.png";
  fileData: File = null;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retrieveSettingData();
  }

  retrieveSettingData() {
    let params = {
      academyId: this.auth.getAcademyId()
    };
    this.api.previewAcademyInformation(params, this.auth.getToken()).subscribe(data => {
      console.log("previewAcademyInformation: ", data)
      if (data.status) {
        this.name = data.data.name;
        this.biography = data.data.biography;
        this.url = data.data.url;
        if (data.data.twitter !== null)
          this.twitter = data.data.twitter;
        if (data.data.facebook !== null)
          this.facebook = data.data.facebook;
        if (data.data.linkDin !== null)
          this.linkDin = data.data.linkDin;
        if (data.data.youTube !== null)
          this.youTube = data.data.youTube;

        if(data.data.logo)
          this.imgURL = JSON.parse(data.data.logo).data["Location"];        
      }
      this.loading = false;
      this.opacity = "";
      return;
    },
      err => {
        this.loading = false;
        this.opacity = "";
        console.log(err)
        return
      }
    )
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  onFileUpload(event) {

    var size = event.target.files[0].size / 1024;
    if (size < 200) {
      this.fileData = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
    else
      alert('This file size is large.');
  }

  onUpdate_Clicked() {
    try {
      this.loading = true;
      this.opacity = "opacity";

      var logo = this.fileData === null ? this.imgURL : this.fileData;

      let formData: FormData = new FormData();
        formData.append('academyId', this.auth.getAcademyId());
        formData.append('name', this.name);
        formData.append('biography', this.biography);
        formData.append('academyLogo', logo);
        formData.append('url', this.url);
        formData.append('twitter', this.twitter);
        formData.append('facebook', this.facebook);
        formData.append('linkDin', this.linkDin);
        formData.append('youTube', this.youTube);


      console.log("Update params:", formData);
      this.api.updateAcademyInformation(formData, this.auth.getToken()).subscribe(data => {
        console.log("Update response:", data);
        if (!data['status'])
          this.toastr.warning(data['msg'])
        else
          this.toastr.success(data['msg']);
      },
        err => {
          console.log(err)
          this.loading = false;
          this.opacity = "";
          this.toastr.warning(err.error.msg)
        }
      )
    }
    catch (err) {
      console.log(err)
      this.loading = false;
      this.opacity = ""
      this.toastr.warning("Please fill the requirements.")
    }
    this.loading = false;
    this.opacity = "";
    return;
  }
}