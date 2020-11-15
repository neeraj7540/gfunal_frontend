import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ecom-dash-orderlist',
  templateUrl: './ecom-dash-orderlist.component.html',
  styleUrls: ['./ecom-dash-orderlist.component.css']
})
export class EcomDashOrderlistComponent implements OnInit {

  public loading: boolean = false;
  public orderListData: any = [];
  createrID: string;
  ecommerceSiteID: string;
  public headerData: any;

  constructor(private productService: ProductService,private api: ApiService,private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private auth: AuthserviceService,private router: Router) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.fetchOrderlist();
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
          console.log("Header Data: ",this.headerData);
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

  fetchOrderlist() {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteID,
      "startingValue": 0,
      "lastValue": 10
    }
    this.api.getorderListData(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      console.log("Orderlist data:", data);      
        if (data.status) {
          var exceljsonobj = [];
          for (var v in data.data)
          {
            var internaljsonobj = [];
            data.data[v].productDetailedInformation.forEach(element => {
              internaljsonobj.push({ 
                "descriptionTitle" : element.descriptionTitle,
                "descriptionContent" : element.descriptionContent,
                "size" : element.variantInformation.size_Price_Quantity.size,
                "productOrderedQuantity" : element.productOrderedQuantity,
                "price" : element.variantInformation.size_Price_Quantity.price,
                "imageSrc" : element.productImages[0].Location
              });
            });

            exceljsonobj.push({
              "id": data.data[v]._id,
              "orderNumber": data.data[v].orderNumber,
              "paymentMode": data.data[v].paymentMode,
              "productData": internaljsonobj
            });
          }

          this.orderListData = exceljsonobj;
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

}