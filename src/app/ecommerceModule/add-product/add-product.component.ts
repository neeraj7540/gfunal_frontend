import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product: any = {};
  public loading: boolean = false;
  public shopID: string;
  public image;
  name: string;
  public collections: Array<any> = [];
  public sliderImages: Array<any> = [];
  public selectedSliderImages: Array<any> = [];
  public deletedSliderImages: Array<any> = [];
  public shippingFromAddresses: Array<any> = [];
  public taxes: Array<any> = [];

  public variant: any = {values:[]};
  public variantTypes: Array<string> = ["Size"];

  public productVariants: Array<any> = [];
  public existingProductID;
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

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        if (data.id) {
          this.existingProductID = data.id;
          this.product = JSON.parse(localStorage.getItem("productEdit"));
          console.log("Product Details:", this.product);
          this.sliderImages = this.product.productImages;
          for (let sliderImage of this.sliderImages) {
            this.selectedSliderImages.push(sliderImage.Location);
          }
           
          this.productVariants = this.product.productDetails;
          for(var i =0; i < this.productVariants.length; i++){
          this.variant.values.push(this.productVariants[i].size_Price_Quantity.size);
          }
        }

        this.getCollections();
        this.getShippingFromAddress();
        this.getTaxesData();
        return
      }
    )
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

  getCollections() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 100
    }
    this.api.getCollections(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          // let dasta = data.map(res => res.data.json());
          console.log(data);

          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          // this.toastr.success(data.msg);
          // this.collections = data.data;

          this.collections = data.data;
          return
        },
        err => {
          this.loading = false;
          // this.toastr.error(err.error.msg)
        }
      )
  }

  getShippingFromAddress() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getShippingFromAddresses(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        this.shippingFromAddresses = data.data;
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }

  getTaxesData() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getTaxes(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        this.taxes = data.data;
        // this.sortData(data.data, "taxCountry");
        // this.toastr.success(data.msg);
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      // if (files.length > 10) {
      //   alert("You can select maximum ten images.");
      //   return;
      // }
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

  removeImage(image: string, index) {
      if (confirm("Are you sure you want to remove this image?")) {
        this.selectedSliderImages.splice(index, 1)
        this.deletedSliderImages.push(this.sliderImages[index].key);
      }
  }

  addProduct() {
    if (!this.product.descriptionTitle)
      this.toastr.warning("Please enter title.");
    else if (!this.product.descriptionContent)
      this.toastr.warning("Please enter description.");
    else if (this.sliderImages.length === 0)
      this.toastr.warning("Please select images.");
    else if (!this.product.productType)
      this.toastr.warning("Please enter product type.");
    else if (!this.product.storeLocationId)
      this.toastr.warning("Please select store location.");
    else if (!this.product.tax)
      this.toastr.warning("Please select tax.");
    else if (!this.product.brand)
      this.toastr.warning("Please enter brand.");
    else if (!this.product.CollectionId)
      this.toastr.warning("Please select collection.");
    else if (this.productVariants.length === 0)
      this.toastr.warning("Please enter atleast one variant.");
    else {
      this.product.productDetails = this.productVariants;

      console.log(this.productVariants);
      // debugger
      this.loading = true;
      const formData = new FormData();
      formData.append('ecommerceSiteId', this.shopID);
      formData.append('CollectionId', this.product.CollectionId);
      formData.append('productType', this.product.productType);
      formData.append('brand', this.product.brand);
      formData.append('tax', this.product.tax);

      formData.append('descriptionContent', this.product.descriptionContent);
      formData.append('descriptionTitle', this.product.descriptionTitle);
      formData.append('storeLocationId', this.product.storeLocationId);

      // formData.append('vendor', "vendor");
      // formData.append('productDetails', this.productVariants.toString());

      // for (var i = 0; i < this.productVariants.length; i++) {
      formData.append('productDetails', JSON.stringify(this.productVariants));
      // }

      for (var i = 0; i < this.sliderImages.length; i++) {
        formData.append('addProductImages', this.sliderImages[i]);
      }

      // formData.append('addProductImages', this.product.collectionDescription);

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
    if (!this.product.descriptionTitle)
      this.toastr.warning("Please enter title.");
    else if (!this.product.descriptionContent)
      this.toastr.warning("Please enter description.");
    // else if (this.sliderImages.length === 0)
    //   this.toastr.warning("Please select images.");
    else if (!this.product.productType)
      this.toastr.warning("Please enter product type.");
    else if (!this.product.storeLocationId)
      this.toastr.warning("Please select store location.");
    else if (!this.product.tax)
      this.toastr.warning("Please select tax.");
    else if (!this.product.brand)
      this.toastr.warning("Please enter brand.");
    else if (!this.product.CollectionId)
      this.toastr.warning("Please select collection.");
    else if (this.productVariants.length === 0)
      this.toastr.warning("Please enter atleast one variant.");
    else {
      this.product.productDetails = this.productVariants;
      this.loading = true;
      const formData = new FormData();
      formData.append('productId',this.existingProductID);
      formData.append('ecommerceSiteId', this.shopID);
      formData.append('CollectionId', this.product.CollectionId);
      formData.append('productType', this.product.productType);
      formData.append('brand', this.product.brand);
      formData.append('tax', this.product.tax);

      formData.append('descriptionContent', this.product.descriptionContent);
      formData.append('descriptionTitle', this.product.descriptionTitle);
      formData.append('storeLocationId', this.product.storeLocationId);

      // formData.append('vendor', "vendor");
      // formData.append('productDetails', this.productVariants.toString());

      // for (var i = 0; i < this.productVariants.length; i++) {
      formData.append('productDetails', JSON.stringify(this.productVariants));
      // }

      for (var i = 0; i < this.sliderImages.length; i++) {
        formData.append('addProductImages', this.sliderImages[i]);
      }

      for (var i = 0; i < this.deletedSliderImages.length; i++) {
        formData.append('listToDeleteImages', this.deletedSliderImages[i]);
      }

      // formData.append('addProductImages', this.product.collectionDescription);

      this.api.updateProduct(formData, this.auth.getToken()).subscribe(data => {
          this.loading = false;
          console.log("Updated response data:", data)
          if (!data.status) {
            this.toastr.warning(data.msg)
            return;
          }
          else
          {
            this.toastr.success(data.msg);
            this.location.back();
            return;
          }
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

  onItemRemoved(event) {
    console.log(event);

    var tempVariants = this
      .productVariants
      .map(el => Object.assign({}, el));

    for (var i = 0; i < this.productVariants.length; i++) {
      console.log("for = " + this.productVariants.length);
      // for (var j = 0; j < tempVariants.length; j++) {
      if (event.variant === this.productVariants[i].size_Price_Quantity.size) {
        tempVariants.splice(i, 1);
        console.log("if = " + i);
        // }
      }
    }

    this.productVariants = tempVariants;
    console.log(this.productVariants);
  }

  onItemAdded(event) {

    this.productVariants = [];

    for (var i = 0; i < this.variant.values.length; i++) {
      var variant = {
        "colorCode": "",
        "size_Price_Quantity": {
          "size": this.variant.values[i].variant,
          "price": 0,
          "quantity": 0,
          "sold": 0
        }
      }
      this.productVariants.push(variant);
    }
    console.log("product Variants: ",this.productVariants);
    // console.log(vari);

  }

  onColorAdded(event, item: any) {
    // this.productVariants = [];

    // for (var i = 0; i < this.variant.values.length; i++) {
    var variant = {
      "colorCode": "",
      "size_Price_Quantity": {
        "size": item.size_Price_Quantity.size,
        "price": 0,
        "quantity": 0,
        "sold": 0
      }
    }

    // let variant = {
    //   "size": item.size,
    //   "quantity": "",
    //   "price": "",
    //   "color": ""
    // }

    this.productVariants.push(variant);
    // }
    console.log(this.productVariants);
  }

  onSaveProduct() {
    console.log(this.productVariants);
  }

}
