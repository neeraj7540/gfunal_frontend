import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-b-header',
  templateUrl: './b-header.component.html',
  styleUrls: ['./b-header.component.css']
})
export class BHeaderComponent implements OnInit {

  public blogHeader: any = {};
  public loading: boolean = false;
  // public imageSrc: any;
  public isHeaderDataExist: boolean = false;
  public existedHeaderId: string = "";
  public name: string;

  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router,
    private toastr: ToastrService) { }


  ngOnInit() {
    var blogId = localStorage.getItem("blogId");
    this.getBlogHeader(blogId);
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

  getBlogHeader(_id: string) {
    this.loading = true;
    var params = {
      "blogSiteId": _id
    }
    this.api.getBlogHeaderData(params, this.auth.getToken())
      .subscribe(
        data => {
          this.loading = false;
          console.log("data is", data)
          if (!data.status) {
            this.isHeaderDataExist = false;
            this.toastr.warning(data.msg)
            return
          }
          this.isHeaderDataExist = true;
          this.existedHeaderId = data.data._id;
          this.blogHeader = data.data;
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
      reader.onload = () => {
        this.blogHeader.blogLogo = reader.result
        console.log(this.blogHeader.blogLogo);
      };
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    //  alert(this.ecommerceHeader.blogLogo)
    this.blogHeader.blogLogo = "";
  }

  onSave() {
    console.log(this.blogHeader);
    if (!this.blogHeader.blogName)
      this.toastr.warning("Please enter blog name.");
    else if (!this.blogHeader.headerCustomText)
      this.toastr.warning("Please enter header custom text.");
    else if (!this.blogHeader.blogLogo)
      this.toastr.warning("Please select blog logo.");
    // else if (!this.ecommerceHeader.fb_link)
    //   this.toastr.warning("Please enter facebook link.");
    // else if (!this.ecommerceHeader.tw_link)
    //   this.toastr.warning("Please enter twitter link.");
    // else if (!this.ecommerceHeader.yt_link)
    //   this.toastr.warning("Please enter youtube link.");
    // else if (!this.ecommerceHeader.ld_link)
    //   this.toastr.warning("Please enter linkedin link.");
    // else if (!this.ecommerceHeader.ig_link)
    //   this.toastr.warning("Please enter instagram link.");
    // else if (!this.ecommerceHeader.pt_link)
    //   this.toastr.warning("Please enter pinterest link.");
    else {
      this.loading = true;
      this.blogHeader.socialNetWorks = "socialNetWorks";
      this.blogHeader.blogSiteId = localStorage.getItem("blogId");
      var apiName = "headerOfBlogs";

      if (this.isHeaderDataExist) {
        apiName = "updateBlogHeader";
        this.blogHeader.blogHeaderid = this.existedHeaderId;
      }

      this.api.saveOrUpdateBlogHeader(this.blogHeader, this.auth.getToken(), apiName).subscribe(
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
