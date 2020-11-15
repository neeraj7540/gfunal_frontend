import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  name: string;
  public collection: any = {};
  public loading: boolean = false;
  public shopID: string;
  public image = null;
  public existingCollectionID;
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
  url : string = this.auth.getShopUrl();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getProfile(this.auth.getToken());
  }
  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(data => {
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
        if (!data.shopId) 
          return this.router.navigate(['/ecommerce/shop-list']);
        
        this.shopID = data.shopId;
        if (data.id) {
          this.existingCollectionID = data.id;
          this.getCollectionData();
        }
        return
      }
    )
  }
  getCollectionData() {
    this.loading = true;
    var params = {
      "collectionId": this.existingCollectionID,
      "ecommerceSiteId": this.shopID
    }
    this.api.getCollection(params, this.auth.getToken()).subscribe(data => {
          console.log("collection data is", data)
          this.loading = false;
          if (!data.status) 
            this.toastr.warning(data.msg);
          else{
            this.toastr.success(data.msg);
            this.collection = data.data;
            this.collection.collectionImage = data.data.collectionImage.Location;
          }
          return;
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
      this.image = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.collection.collectionImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  createCollection() {
    if (!this.collection.collectionTitle)
      this.toastr.warning("Please enter title.");
    else if (!this.collection.collectionDescription)
      this.toastr.warning("Please enter description.");
    else if (!this.image)
      this.toastr.warning("Please select an image.");
    else {
      this.loading = true;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      formData.append('collectionImage', this.image);
      formData.append('collectionTitle', this.collection.collectionTitle);
      formData.append('collectionDescription', this.collection.collectionDescription);

      this.api.createCollection(formData, this.auth.getToken()).subscribe(
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
  updateCollection() {
    if (!this.collection.collectionTitle)
      this.toastr.warning("Please enter title.");
    else if (!this.collection.collectionDescription)
      this.toastr.warning("Please enter description.");
    else {
      this.loading = true;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      if (this.image !== null)
        formData.append('collectionImage', this.image);
      else
        formData.append('collectionImage', this.collection.collectionImage);

      formData.append('newCollectionTitle', this.collection.collectionTitle);
      formData.append('newCollectionDescription', this.collection.collectionDescription);
      formData.append('collectionId', this.existingCollectionID);

      this.api.updateCollection(formData, this.auth.getToken()).subscribe(
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
    if (this.loading) 
      return true
    else 
      return false
  }
}