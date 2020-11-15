import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-ecom-dash-product-details',
  templateUrl: './ecom-dash-product-details.component.html',
  styleUrls: ['./ecom-dash-product-details.component.css']
})
export class EcomDashProductDetailsComponent implements OnInit {

  public product: any;
  public loading: boolean = false;
  public headerData: any;
  public selectedColor: string;
  collectionName: string;
  createrID: string;
  ecommerceSiteID: string;
  collectionID: string;

  varientId: string = "";


  constructor(private productService: ProductService, private api: ApiService, private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private auth: AuthserviceService, private router: Router) {
    this.product = productService.getProductt();
    console.log("Product details:", this.product);
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(

      data => {
        if (!data.id) {
          // return this.router.navigate(['/cb-template-buy-now']);
        }
        this.createrID = data.createdById;
        this.ecommerceSiteID = data.id;
        this.collectionID = data.collectionId;
        this.collectionName = data.name;
        return
      }
    )
  }

  public fetchHeaderData(): void {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteID,
      "createdById": this.createrID
    }
    this.api.getEcommerceHeaderData(params).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.headerData = data.data;
          console.log("dafsdfsdfsdfsdf", this.headerData);

          // this.menuCollectionsPages = data.data.collectionAndPages
          return
        }
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }


  ngOnInit() {
    this.checkQueryIsAvailable();
    this.fetchHeaderData()
  }

  onVarient_Selected(event: any) {
    this.varientId = event._id;
  }

  onAddToBag_Click() {
    if (this.validation()) {
      try {
        this.loading = true;

        let params = {
          productId: this.product._id,
          variantId: this.varientId,
          quantity: 1,
          ecommerceSiteId: this.ecommerceSiteID
        }
        this.api.addToCart(params, this.auth.getEcommercerUserToken()).subscribe(data => {
          if (!data['status'])
            this.toastr.warning(data['msg']);
          else {
            this.toastr.success(data['msg']);
            this.router.navigate(['/ecom-dash-cart'], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } });
          }

          this.loading = false;
          return;
        },
          err => {
            console.log(err)
            this.loading = false;
            this.toastr.warning(err.error.msg)
          }
        )
      }
      catch (err) {
        console.log(err)
        this.loading = false;
        this.toastr.warning("Please fill the requirements.")
      }
      return
    }
  }

  validation(): boolean {
    if (!this.varientId) {
      this.toastr.warning("Please select size.")
      return false;
    }

    return true;
  }

  onWishlist_Click(){
    if (this.validation()) {
      try {
        this.loading = true;
        let params = {
          productId: this.product._id,
          variantId: this.varientId,
          quantity: 1,
          ecommerceSiteId:  this.ecommerceSiteID
        }
        this.api.moveToWishList(params, this.auth.getEcommercerUserToken()).subscribe(data => {
          if (!data['status']) 
            this.toastr.warning(data['msg']);
          else
            this.toastr.success(data['msg']);
          
          this.loading = false;
          return;
        },
          err => {
            console.log(err)
            this.loading = false;
            this.toastr.warning(err.error.msg)
          }
        )
      }
      catch (err) {
        console.log(err)
        this.loading = false;        
        this.toastr.warning("Please fill the requirements.")
      }
      return
    }
  }
}
