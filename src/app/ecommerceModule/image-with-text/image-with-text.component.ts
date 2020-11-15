import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-with-text',
  templateUrl: './image-with-text.component.html',
  styleUrls: ['./image-with-text.component.css']
})
export class ImageWithTextComponent implements OnInit {

  public ecommerceImageText: any = {};
  public loading: boolean = false;
  private shopID: string;
  private imageTextId: string;
  name: string;
  public editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "140px",
    "width": "auto",
    "minWidth": "0",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"]
    ]
  };
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
        this.getImageTextData();
        return
      }
    )
  }

  getImageTextData() {
    this.loading = true;
    let params = { ecommerceSiteId: this.shopID };
    this.api.getImageTextData(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg)
          return
        }
        this.imageTextId = data.data._id;

        // console.log(myObjStr.data.Location);

        const myObjStr = JSON.parse(data.data.imageInfo);
        this.ecommerceImageText.selectedImage = myObjStr.data.Location;
        this.toastr.success(data.msg);
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
      this.ecommerceImageText.image = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.ecommerceImageText.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    if (!this.imageTextId) {
      this.ecommerceImageText.image = "";
    } else {
      if (confirm("Are you sure you want to delete this image?")) {
        this.loading = true;

        var params = {
          "imageWithTextId": this.imageTextId,
          "ecommerceSiteId": this.shopID
        }
        this.api.deleteImageTextData(params, this.auth.getToken())
          .subscribe(
            data => {
              console.log("data is", data)
              this.loading = false;
              if (!data.status) {
                this.toastr.warning(data.msg);
                return
              }
              this.imageTextId = null;
              this.ecommerceImageText.selectedImage = "";
              this.ecommerceImageText.image = null;
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
  }

  onSubmit() {

    if (!this.ecommerceImageText.image)
      this.toastr.warning("Please select image.");
    else if (!this.ecommerceImageText.imageContent)
      this.toastr.warning("Please type some text.");
    else {
      this.loading = true;
      // this.ecommerceSlider.ecommerceSiteId = this.shopID;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      formData.append('image', this.ecommerceImageText.image);
      formData.append('imageContent', this.ecommerceImageText.imageContent);

      this.api.saveImageTextData(formData, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.imageTextId = data.data._id;
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
