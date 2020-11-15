import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  opacity: string = "";
  public loading: boolean = false;
  public token: string;
  public receivedData: Array<any> = [];
  public paggingArray: Array<any> = [];
  public landdingPageID: string;
  public data: any;
  name: string = this.auth.getUserName();
  private shopID: string;


  constructor(private auth: AuthserviceService, private api:
    ApiService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.loading = false;
    this.opacity = "opacity";
    this.retrievelistingContacts();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        return
      }
    )
  }

   retrievelistingContacts(): void {
    this.token = this.auth.getToken();

    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 600
    }
    this.api.getCustomers(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          console.log(data);

          this.loading = false;
          if (!data.status) {
            return
          }
          this.receivedData = data.data;
          return
        },
        err => {
          this.loading = false;
        }
      )

  }

  onDelete_Clicked(data) {


  }

  openCreateCustomer() {
    this.router.navigate(['/ecommerce/create-customer'], { queryParams: { shopId: this.shopID } });

  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  onPaginaion_Clicked(data) {

  }
}
