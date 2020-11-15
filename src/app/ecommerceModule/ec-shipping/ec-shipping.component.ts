import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { IndexedSlideList } from 'ngx-bootstrap/carousel/models';
import { GroupByPipe } from '../group-by.pipe';

@Component({
  selector: 'app-ec-shipping',
  templateUrl: './ec-shipping.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ec-shipping.component.css']
})
export class EcShippingComponent implements OnInit {

  public loading: boolean = false;
  public shopID: string;

  public shippingFrom: any = {};
  public shippingFromAddresses: Array<any> = [];


  public zoneAddress: any = {};
  public zoneRate: any = {};
  public shippingZoneAddresses: Array<any> = [];

  public isSaveOrUpdate: boolean = true;
  public isSaveOrUpdateZone: boolean = true;

  groupByPipe = new GroupByPipe();
  name:string;


  @ViewChild('addShippingFromAddress',{static: false}) addShippingFromAddressModal: any;
  @ViewChild('addZoneModal',{static: false}) addShippingZoneModal: any;
  @ViewChild('addZoneRateModal',{static: false}) addZoneRateModal: any;



  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    // private cd: ChangeDetectorRef,
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
        this.getShippingFromAddress();
        this.getShippingZoneData();
        return;
      }
    )
  }

  openEditShippingFromAddress(address: any, index) {
    this.shippingFrom = address;
    this.shippingFrom.storeAddressId = address._id;
    this.addShippingFromAddressModal.show();
    this.isSaveOrUpdateZone = false;
  }

  openShippingFromAddress() {
    this.shippingFrom = {};
    this.addShippingFromAddressModal.show();
    this.isSaveOrUpdateZone = true

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
          // this.toastr.warning(data.msg);
          return
        }
        // this.toastr.success(data.msg);
        this.shippingFromAddresses = data.data;
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }

  onDeleteShippingFromAddress(address: any, index) {
    if (confirm("Are you sure you want to delete this address?")) {
      this.loading = true;
      var params = {
        "shippingFromId": address._id,
      }
      this.api.deleteShippingFromAddress(params, this.auth.getToken())
        .subscribe(
          data => {
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.shippingFromAddresses.splice(index, 1);
            this.toastr.success(data.msg);
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }


  saveShippingFromAddress(isSaveOrUpdateZone: boolean) {
    if (!this.shippingFrom.businessName)
      this.toastr.warning("Please enter bussiness name.");
    else if (!this.shippingFrom.phone)
      this.toastr.warning("Please enter phone.");
    else if (!this.shippingFrom.street)
      this.toastr.warning("Please enter street.");
    else if (!this.shippingFrom.city)
      this.toastr.warning("Please enter city.");
    else if (!this.shippingFrom.zipCode)
      this.toastr.warning("Please enter postal code.");
    else if (!this.shippingFrom.country)
      this.toastr.warning("Please enter country.");
    else if (!this.shippingFrom.state)
      this.toastr.warning("Please enter state.");
    else {
      this.loading = true;
      this.shippingFrom.ecommerceSiteId = this.shopID;
      this.api.saveOrUpdateShippingFrom(this.shippingFrom, this.auth.getToken(),isSaveOrUpdateZone).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.addShippingFromAddressModal.hide();
          this.getShippingFromAddress();

          this.toastr.success(data.msg);
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  // Shipping zone rate

  getShippingZoneData() {
    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.getShippingZone(params, this.auth.getToken())
      .subscribe(data => {
        console.log("data is", data)
        this.loading = false;
        if (!data.status) {
          // this.toastr.warning(data.msg);
          return
        }
        // this.shippingZoneAddresses = data.data;
        this.sortData(data.data, "shippingType");

        // this.groupByPipe.transform(this.shippingZoneAddresses, "shippingType");
        // this.toastr.success(data.msg);
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }


  openAddshippingZoneModal(type: string) {
    this.zoneAddress = {};
    this.zoneRate = {};
    this.zoneAddress.shippingType = type;
    this.isSaveOrUpdate = true;
    this.addZoneRateModal.show();
  }

  openEditshippingZoneModal(shipping: any, rate: any) {
    this.zoneAddress = {};
    this.zoneRate = {};
    this.isSaveOrUpdate = false;
    this.zoneRate.shippingParticular = rate.shippingParticular;
    this.zoneRate.shippingWeightRange = rate.shippingWeightRange;
    this.zoneRate.shippingPrice = rate.shippingPrice;
    this.zoneAddress.shippingType = shipping.name;
    this.zoneAddress.shippingId = rate._id
    this.addZoneRateModal.show();
  }

  addShippingZone() {
    if (!this.zoneAddress.shippingType)
      this.toastr.warning("Please enter zone type.");
    else {
      // this.cd.detectChanges();
      // this.cd.markForCheck();
      var ob = {
        name: this.zoneAddress.shippingType,
        data: []
      }

      this.shippingZoneAddresses.push(ob);
      console.log(this.shippingZoneAddresses);
      // this.groupByPipe.transform(this.shippingZoneAddresses, "shippingType");

      this.addShippingZoneModal.hide();
    }
  }

  addZoneRate(isSaveOrUpdate: boolean) {
    if (!this.zoneRate.shippingParticular)
      this.toastr.warning("Please enter shipping name.");
    else if (!this.zoneRate.shippingWeightRange)
      this.toastr.warning("Please enter max weight.");
    else if (!this.zoneRate.shippingPrice)
      this.toastr.warning("Please enter price.");
    else {
      this.loading = true;
      this.zoneAddress.ecommerceSiteId = this.shopID;

      this.zoneAddress.shippingParticular = this.zoneRate.shippingParticular;
      this.zoneAddress.shippingWeightRange = this.zoneRate.shippingWeightRange;
      this.zoneAddress.shippingPrice = this.zoneRate.shippingPrice;


      this.api.saveUpdateShippingZone(this.zoneAddress, this.auth.getToken(), isSaveOrUpdate).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.addZoneRateModal.hide();
          this.toastr.success(data.msg);
          this.getShippingZoneData();
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  onDeleteshippingZone(shippingone, index) {
    if (confirm("Are you sure you want to delete this shipping zone.?")) {
      this.loading = true;
      var params = {
        "shippingStandardsId": shippingone._id,
      }
      this.api.deleteShippingZone(params, this.auth.getToken())
        .subscribe(
          data => {
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.getShippingZoneData();
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


  sortData(collection: Array<any>, property: string) {
    console.log(collection);
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    }, {});


    console.log("pipe");
    console.log(Object.keys(groupedCollection).map(name => ({ name, data: groupedCollection[name] })));
    this.shippingZoneAddresses = Object.keys(groupedCollection).map(name => ({ name, data: groupedCollection[name] }));

  }
}
