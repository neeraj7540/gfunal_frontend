import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {


  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router,
    private toastr: ToastrService,
    private location: Location) { }

  public loading: boolean = false;
  public pageContent;
  name: string;
  public imageSrc: any;
  public blog_id: string;
  public addPageParam: any = {};
  public categories: Array<any> = [];

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
  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getProfile(this.auth.getToken());
    this.getCategories();
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
        if (data.pageId) {
          this.blog_id = data.pageId;
          this.getPageData(data.pageId);
        }
        return
      }
    )
  }
  public getCategories(): void {
    var params = {
      "startingValue": 0,
      "lastValue": 50,
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.blogCategoryList(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.categories = data.data
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }
  getPageData(_id: string) {
    this.loading = true;
    var params = {
      "blog_id": _id
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

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.addPageParam.image = reader.result;
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    // alert(this.imageSrc)s
    this.addPageParam.image = ""
  }

  publish(isPublished: boolean) {
    console.log(this.addPageParam);

    if (!this.addPageParam.pageTitle)
      this.toastr.warning("Please enter page title.");
    else if (!this.addPageParam.metaKeywords)
      this.toastr.warning("Please enter at least one meta keyword.");
    else if (!this.addPageParam.image)
      this.toastr.warning("Please select an image.");
    else {
      this.loading = true;
      this.addPageParam.savedAs = isPublished;
      this.addPageParam.blogSiteId = localStorage.getItem("blogId");

      this.api.addPage(this.addPageParam, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;

          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.router.navigate(['/page-list'])
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }


  update(isSavedAs: boolean) {
    console.log(this.addPageParam);

    if (!this.addPageParam.pageTitle)
      this.toastr.warning("Please enter Blog title.");
    else if (!this.addPageParam.metaKeywords)
      this.toastr.warning("Please enter at least one meta keyword.");
    else if (!this.addPageParam.image)
      this.toastr.warning("Please select an image.");
    else {
      this.loading = true;
      var params = {
        "newPageTitle": this.addPageParam.pageTitle,
        "newPageContent": this.addPageParam.pageContent,
        "newmetaKeywords": this.addPageParam.metaKeywords,
        "newmetaDescription": this.addPageParam.metaDescription,
        "newSavedAs": isSavedAs,
        "newImage": this.addPageParam.image,
        "blog_id": this.blog_id
      }
      this.api.updatePage(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.router.navigate(['/page-list'])
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
