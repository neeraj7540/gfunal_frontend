import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddFunnelProductComponent implements OnInit {

  public product: any = {};
  public loading: boolean = false;
  name: string;
  public productImage: any;
  public productImageView: string;
  public existedProductId: string;
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
  fileData: File = null;


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
        if (data.id) {
          this.existedProductId = data.id;
          this.getProductData(data.id);
        }
        return
      }
    )
  }

  getProductData(_id: string) {
    this.loading = true;
    var params = {
      "productID": _id
    }
    this.api.getProduct(params, this.auth.getToken())
      .subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          this.product.productName = data.data.product_name;
          this.product.productDescription = data.data.product_description;
          this.product.productPrice = data.data.product_price;
          // this.product.quantity = data.data.product_quantity;



          const myObjStr = JSON.parse(data.data.product_image);
          this.product.productImageView = myObjStr.data.Location;

          return
        },
        err => {
          this.loading = false;
        }
      )
  }

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      this.productImage = files[0];
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.product.productImageView = e.target.result;
          }
          reader.readAsDataURL(file);
        }
      }
      console.log(files);
    }
  }

  addProduct() {
    if (!this.product.productName)
      this.toastr.warning("Please enter product name.");
    else if (!this.product.productDescription)
      this.toastr.warning("Please enter product description.");
    else if (!this.productImage)
      this.toastr.warning("Please select images.");
    else if (!this.product.productPrice)
      this.toastr.warning("Please enter product price.");

    else {
      console.log(this.product);
      this.loading = true;
      const formData = new FormData();
      formData.append('productName', this.product.productName);
      formData.append('productPrice', this.product.productPrice);
      formData.append('productDescription', this.product.productDescription);
      formData.append('productImage', this.productImage);

      this.api.createProduct(formData, this.auth.getToken()).subscribe(
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

  updateProduct() {
    if (!this.product.productName)
      this.toastr.warning("Please enter product name.");
    else if (!this.product.productDescription)
      this.toastr.warning("Please enter product description.");
    else if (!this.productImage)
      this.toastr.warning("Please select images.");
    else if (!this.product.productPrice)
      this.toastr.warning("Please enter product price.");

    else {
      console.log(this.product);
      this.loading = true;
      const formData = new FormData();
      formData.append('productID', this.existedProductId);
      formData.append('newProductName', this.product.productName);
      formData.append('newProductPrice', this.product.productPrice);
      formData.append('newProductDescription', this.product.productDescription);
      formData.append('producteditImage', this.productImage);

      this.api.updateProduct(formData, this.auth.getToken()).subscribe(
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

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  previewUrl: any = null;
  preview() {    
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

}
