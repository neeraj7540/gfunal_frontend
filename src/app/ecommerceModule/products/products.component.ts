import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Array<any> = [];
  public loading: boolean = false;
  private shopID: string;
  name: string;

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
        this.getProducts();
        return
      }
    )
  }


  getProducts() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getProducts(params, this.auth.getToken()).subscribe(data => {
          console.log("Product Data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          this.products = data.data;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }

  editProduct(product: any) {
    if (confirm("Are you sure you want to edit this product?")) {
      localStorage.setItem("productEdit", JSON.stringify(product));
      this.router.navigate(['/ecommerce/add-product'], { queryParams: { shopId: this.shopID, id: product._id } })
    }
  }

  deleteProduct(collection: any, index) {
    if (confirm("Are you sure to delete this product?")) {
      this.loading = true;

      var params = {
        "ecommerceSiteId": this.shopID,
        "productId": collection._id
      }
      this.api.deleteProduct(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.products.splice(index, 1);
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  openAddProduct() {
    this.router.navigate(['/ecommerce/add-product'], { queryParams: { shopId: this.shopID } });
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
