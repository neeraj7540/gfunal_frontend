import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ecom-dash-cartpage',
  templateUrl: './ecom-dash-cartpage.component.html',
  styleUrls: ['./ecom-dash-cartpage.component.css']
})
export class EcomDashCartpageComponent implements OnInit {

  public loading: boolean = false;
  createrID: string;
  ecommerceSiteID: string;
  discountListData: Array<any> = [];
  cartCount: number = 0;
  bagTotal: number = 0;
  bagDiscount: number = 0;
  bagTax: number = 0;
  discountCoupon: string = "Apply Coupon";
  orderTotal : number = 0;
  grandTotal: number = 0;
  cartListData: Array<any> = [];
  logoLocation : string = "";

  @ViewChild('basicModal',{static: false}) funnelUpdateModal: any;

  constructor(private productService: ProductService, private api: ApiService, private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private auth: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();
    this.fetchCartlist();
    this.fetchDiscountList();
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
    this.api.getEcommerceHeaderData(params).subscribe(data => {
        if (data.status) {
          this.logoLocation = data.data.headerInformation.ecommerceLogo.Location;
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

  fetchCartlist() {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteID,
      "startingValue": 0,
      "lastValue": 100
    }
    this.api.cartList(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      console.log("cartList data:", data);
      if (data.status) {
        this.cartCount = data.data.length;
        this.bagTotal = data.totalAmount.bagAmount;
        this.bagTax = data.totalAmount.taxArray;
        var exceljsonobj = [];
        for (var v in data.data) {
          exceljsonobj.push({
            "id": data.data[v]._id,
            "productImages": data.data[v].productInformation.productImages[0].Location,
            "productId": data.data[v].productInformation.productId,
            "descriptionTitle": data.data[v].productInformation.descriptionTitle,
            "totalAmountOfItem": data.data[v].totalAmountOfItem,
            "varientId": data.data[v].productInformation.variantInformation._id,
            "itemVarient": data.data[v].productInformation.variantInformation.colorCode,
            "itemSize": data.data[v].productInformation.variantInformation.size_Price_Quantity.size,
            "itemQty": data.data[v].orderQuantity
          });
        }
        this.cartListData = exceljsonobj;

        this.orderTotal = this.grandTotal = this.bagTotal + this.bagTax;
      }
      else
        this.cartListData = null;
      return;
    },
      err => {
        this.loading = false;
        console.log("Error is:", err)
        this.cartListData = null;
        this.cartCount = this.bagTotal = this.bagTax = this.orderTotal = this.grandTotal = 0;
        return
      }
    )
  }

  fetchDiscountList() {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteID
    }
    this.api.discountCouponListing(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      console.log("discount data:", data);
      if (data.status) {
        var exceljsonobj = [];
        for (var v in data.data) {

          var discount = data.data[v].discountType ? data.data[v].discount : data.data[v].discount + '%';

          exceljsonobj.push({
            "ecommerceSiteId": data.data[v].ecommerceSiteId,
            "discountCode": data.data[v].discountCode,
            "discount": discount,
            "endDate": data.data[v].activeDates.endDate,
            "summary": data.data[v].summary,
            "discountType": data.data[v].discountType,
            "actualDis": data.data[v].discount
          });
        }

        this.discountListData = exceljsonobj;
      }
      this.loading = false;
      return;
    },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  onRemoveItem_Clicked(cartItem){
    if(confirm("Are you sure to delete this item.")){
      try {
        this.loading = true;
        let params = {
          cartId : cartItem.id
        }
        console.log("sdsds", params);
        this.api.deleteCartValue(params, this.auth.getEcommercerUserToken()).subscribe(data => {
          if (!data['status']) 
            this.toastr.warning(data['msg']);
          else{
            this.toastr.success(data['msg']);
            this.fetchCartlist();
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

  onMoveToWishList_Clicked(cartItem) {
    try {
      this.loading = true;
      let params = {
        productId: cartItem.productId,
        variantId: cartItem.varientId,
        quantity: cartItem.itemQty,
        ecommerceSiteId: this.ecommerceSiteID
      }

      console.log("Input for wishlist", params);
      this.api.moveToWishList(params, this.auth.getEcommercerUserToken()).subscribe(data => {
        if (!data['status'])
          this.toastr.warning(data['msg']);
        else{
          this.toastr.success(data['msg']);
          console.log("dfdfsdfsdfsfsdfsdf")
          this.fetchCartlist();
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
    return;
  }

  onDiscount_Click(item){
    console.log("Discount Item", item);
    this.discountCoupon = item.discountCode;

    if (item.discountType) 
      this.bagDiscount = item.discount;
    else 
      this.bagDiscount = (item.actualDis / 100) * this.bagTotal;

    this.orderTotal = this.grandTotal = this.bagTotal + this.bagTax - this.bagDiscount;
    this.funnelUpdateModal.hide();
  }

  onPlaceOrder_Clicked(){
    this.router.navigate(["/ecom-dash-edit-address"], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
  }

  openDashboard(){
    this.router.navigate(["/ecom-dash-dashboard"], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
  }
}
