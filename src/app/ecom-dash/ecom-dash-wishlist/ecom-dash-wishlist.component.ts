import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ecom-dash-wishlist',
  templateUrl: './ecom-dash-wishlist.component.html',
  styleUrls: ['./ecom-dash-wishlist.component.css']
})
export class EcomDashWishlistComponent implements OnInit {

  public loading: boolean = false;
  public wishListData: any = [];
  createrID: string;
  ecommerceSiteID: string;
  wishlistCount : number;
  public headerData: any;

  constructor(private productService: ProductService,private api: ApiService,private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private auth: AuthserviceService,private router: Router) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.fetchWishlist();
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        this.createrID = data.createdById;
        this.ecommerceSiteID = data.id;
        this.fetchHeaderData();
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

  fetchWishlist() {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteID,
      "startingValue": 0,
      "lastValue": 10
    }
    this.api.getwishlistData(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      console.log("Wishlist data:", data);      
        if (data.status) {
          var exceljsonobj = [];
          for (var v in data.data)
          {
            exceljsonobj.push({
              "id": data.data[v]._id,
              "productId": data.data[v].productId,
              "productImages": data.data[v].productImages[0].Location,
               "variantId": data.data[v].variantInformation._id,
               "descriptionTitle" : data.data[v].descriptionTitle,
               "price": data.data[v].variantInformation.size_Price_Quantity.price
            });
          }

          this.wishListData = exceljsonobj;
          this.wishlistCount = this.wishListData.length;
        }
        this.loading = false;
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  onRemoveItem(id){
    if(confirm("Are you sure to delete this item.")){
      try {
        this.loading = true;
        let params = {
          wishProductId : id
        }
        this.api.removeFromWishList(params, this.auth.getEcommercerUserToken()).subscribe(data => {
          if (!data['status']) 
            this.toastr.warning(data['msg']);
          else{
            this.toastr.success(data['msg']);
            this.fetchWishlist();
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
    }
  }

  onAddToBag_Click(data) {
    try {
      this.loading = true;

      let params = {
        productId: data.productId,
        variantId: data.variantId,
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
  }
}
