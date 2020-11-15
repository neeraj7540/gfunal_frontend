import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ec-add-page',
  templateUrl: './ec-add-page.component.html',
  styleUrls: ['./ec-add-page.component.css']
})
export class EcAddPageComponent implements OnInit {


  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router,
    private toastr: ToastrService,
    private location: Location) { }

  public loading: boolean = false;
  public pageContent;
  name: string;
  public addPageParam: any = {};
  private shopID: string;
  public existedPageId;
  public editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "500px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink", "image", "video"]
    ]
  };

  url : string = this.auth.getShopUrl();

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
        if (data.pageId) {
          this.existedPageId = data.pageId;
          this.getPageData(data.pageId);
        }

        return
      }
    )
  }

  getPageData(_id: string) {
    this.loading = true;
    var params = {
      "ecommercePageID": _id,
      "ecommerceSiteId": this.shopID
    }
    this.api.getPageData(params, this.auth.getToken())
      .subscribe(
        data => {
          this.loading = false;
          console.log("data is", data)
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.addPageParam = data.data;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }


  save() {
    console.log(this.addPageParam);
    if (!this.addPageParam.pageTitle)
      this.toastr.warning("Please enter page title.");
    else if (!this.addPageParam.pageDescription)
      this.toastr.warning("Please enter page description.");
    else {
      this.loading = true;
      this.addPageParam.ecommerceSiteId = this.shopID;
      this.api.addPage(this.addPageParam, this.auth.getToken()).subscribe(
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

  update() {
    console.log(this.addPageParam);
    if (!this.addPageParam.pageTitle)
      this.toastr.warning("Please enter page title.");
    else if (!this.addPageParam.pageDescription)
      this.toastr.warning("Please enter page description.");
    else {
      this.loading = true;
      let params = {
        "ecommerceSiteId": this.shopID,
        "ecommercePageID": this.existedPageId,
        "newPageTitle": this.addPageParam.pageTitle,
        "newPageDescription": this.addPageParam.pageDescription
      }
      this.api.updatePage(params, this.auth.getToken()).subscribe(
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

}
