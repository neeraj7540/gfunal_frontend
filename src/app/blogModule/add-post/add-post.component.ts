import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public addPostParam: any = {};
  public isImageValid: boolean = true;
  name: string;
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

  // public imageSrc: any;
  public loading: boolean = false;
  public blog_id: string;
  public categories: Array<any> = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getCategories();
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
        if (data.blogId) {
          this.blog_id = data.blogId;
          this.getPostData(data.blogId);
        }
        return
      }
    )
  }
  public getCategories(): void {
    var params = {
      "startingValue": 0,
      "lastValue": 500,
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


  getPostData(_id: string) {
    this.loading = true;
    var params = {
      "blog_id": _id
    }
    this.api.postData(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.addPostParam = data.data;
          this.addPostParam.category = data.data.category.trim();
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
      const img = new Image();
      img.src = window.URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = e => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);
        console.log(width + " " + height);
        if (width >= 1200 && height >= 600) {
          this.isImageValid = false;
          alert("Image size must not be greater than 1200 x 600.");
        }
        this.addPostParam.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    // alert(this.addPostParam.image)
    this.addPostParam.image = "";
  }

  publish(isPublish: boolean) {
    console.log(this.addPostParam);
    console.log(this.categories);

    if (!this.addPostParam.blogTitle)
      this.toastr.warning("Please enter Blog title.");
    else if (!this.addPostParam.category)
      this.toastr.warning("Please select at least one category.");
    else if (!this.addPostParam.metaKeywords)
      this.toastr.warning("Please enter at least one meta keyword.");
    else if (!this.isImageValid)
      this.toastr.warning("Please select valid image.");
    else {
      this.loading = true;
      this.addPostParam.savedAs = isPublish;
      this.addPostParam.blogSiteId = localStorage.getItem("blogId");
      this.addPostParam.blogName = localStorage.getItem("blogName");
      this.api.addPost(this.addPostParam, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.router.navigate(['/blog-post-list'])
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
    console.log(this.addPostParam);

    if (!this.addPostParam.blogTitle)
      this.toastr.warning("Please enter Blog title.");
    else if (!this.addPostParam.category)
      this.toastr.warning("Please select at least one category.");
    else if (!this.addPostParam.metaKeywords)
      this.toastr.warning("Please enter at least one meta keyword.");
    else if (!this.isImageValid)
      this.toastr.warning("Please select valid image.");
    else {
      this.loading = true;
      var params = {
        "newCategory": this.addPostParam.category,
        "newblogTitle": this.addPostParam.blogTitle,
        "newBlogContent": this.addPostParam.BlogContent,
        "newmetaKeywords": this.addPostParam.metaKeywords,
        "newmetaDescription": this.addPostParam.metaDescription,
        "newSavedAs": isSavedAs,
        "newImage": this.addPostParam.image,
        "blog_id": this.blog_id
      }
      this.api.updatePost(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.router.navigate(['/blog-post-list'])
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
