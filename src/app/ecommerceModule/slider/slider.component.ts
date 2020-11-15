import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  // public ecommerceSlider: any = {};
  public loading: boolean = false;
  public shopID: string;
  public sliderDataId: string;
  public formattingText: string;

  public sliderImages: Array<any> = [];
  public selectedSliderImages: Array<any> = [];
  name: string;

  public deletedSliderImages: Array<any> = [];

  public editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "200px",
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
  constructor(private router: Router,private activeRoute: ActivatedRoute,private api: ApiService,private auth: AuthserviceService,
    private location: Location,private toastr: ToastrService) { }

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
        this.getSliderData();
        return
      }
    )
  }

  getSliderData() {
    this.loading = true;
    let params = { ecommerceSiteId: this.shopID };
    this.api.getSliderData(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg)
          return
        }
        this.sliderDataId = data.data._id;;
        this.formattingText = data.data.formattingText;
        this.sliderImages = data.data.slideImages;
        for (let sliderImage of this.sliderImages) {
          this.selectedSliderImages.push(sliderImage.Location);
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

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      if (files.length > 10) {
        alert("You can select maximum ten images.");
        return;
      }
      for (var i = 0; i < files.length; i++) {
        this.sliderImages.push(files[i]);
      }
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.selectedSliderImages.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }

      console.log(files);
    }
  }

  onSubmit() {
    // if (!this.formattingText)
    //   this.toastr.warning("Please type some text.");
    // else {
      this.loading = true;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      // formData.append('formattingText', this.formattingText);
      for (var i = 0; i < this.sliderImages.length; i++) {
        formData.append('photos', this.sliderImages[i]);
      }
      this.api.saveSliderData(formData, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.sliderDataId = data.data._id;
          this.toastr.success(data.msg);
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    // }
  }


  onUpdate() {
    // if (!this.formattingText)
    //   this.toastr.warning("Please type some text.");
    // else {
      this.loading = true;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      // formData.append('New_formattingText', this.formattingText);
      formData.append('ecommerceSliderId', this.sliderDataId);

      for (var i = 0; i < this.sliderImages.length; i++) {
        formData.append('photos', this.sliderImages[i]);
      }

      for (var i = 0; i < this.deletedSliderImages.length; i++) {
        formData.append('listToDeleteImages', this.deletedSliderImages[i]);
      }

      this.api.updateSliderData(formData, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.sliderDataId = data.data._id;
          this.toastr.success(data.msg);
          this.location.back();
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    // }
  }

  public onDelete() {
    if (confirm("Are you sure you want to delete the slider data?")) {
      this.loading = true;

      var params = {
        "ecommerceSliderId": this.sliderDataId,
        "ecommerceSiteId": this.shopID
      }
      this.api.deleteSliderData(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            // this.location.back();
            this.getSliderData()
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  removeImage(image: string, index) {
    if (this.sliderDataId) {
      if (confirm("Are you sure you want to remove this slider image?")) {
        this.selectedSliderImages.splice(index, 1)
        this.deletedSliderImages.push(this.sliderImages[index].key);
      }
    }
  }
  public check(): boolean {
    if (this.loading) 
      return true
    else 
      return false
  }
}
