import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tax-regions',
  templateUrl: './tax-regions.component.html',
  styleUrls: ['./tax-regions.component.css']
})
export class TaxRegionsComponent implements OnInit {

  public loading: boolean = false;
  public shopID: string;

  public region: any = {};
  public tax: any = {};
  public taxsData: Array<any> = [];

  public isAddTax: boolean = true;
  name: string;

  sortingValue: string;

  @ViewChild('addregion', { static: false }) addRegionModal: any;
  @ViewChild('addtaxes', { static: false }) addTaxModal: any;




  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private auth: AuthserviceService,
    private changeDetector: NgZone,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.sortingValue = "taxCountry";
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
        this.getTaxesData();
        return
      }
    )
  }

  openAddTaxModal(country: string) {
    this.region = {};
    this.tax = {};
    this.region.taxCountry = country;
    this.isAddTax = true;
    this.addTaxModal.show();
  }

  openEditTaxModal(taxCountry: any, tax: any) {
    this.isAddTax = false;
    this.tax.particular = tax.particular;
    this.tax.tax = tax.tax;
    this.region.taxCountry = taxCountry.name;
    this.region.taxStandardId = tax._id;
    this.addTaxModal.show();
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
        // this.taxsData = data.data;
        this.sortData(data.data, "taxCountry");
        // this.toastr.success(data.msg);
        return
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      })
  }

  addRegion() {
    if (!this.region.taxCountry)
      this.toastr.warning("Please enter country.");
    else if (!this.region.area)
      this.toastr.warning("Please enter area.");
    else {
      // this.sortingValue = "";
      // this.sortingValue = "taxCountry";
      var ob = {
        name: this.region.taxCountry,
        data: []
      }
      this.taxsData.push(ob);
      this.region.taxCountry = ""
      this.region.area = ""

      //   this.changeDetector.run(() => {
      // });
      // this.sortData(this.taxsData, "taxCountry");
      // this.changeDetector.detectChanges();

      this.addRegionModal.hide();
    }
  }

  addTax(isAddTax: boolean) {
    if (!this.tax.particular)
      this.toastr.warning("Please enter particular.");
    else if (!this.tax.tax)
      this.toastr.warning("Please enter tax.");
    else {
      this.loading = true;
      this.region.ecommerceSiteId = this.shopID;
      this.region.particular = this.tax.particular;
      this.region.tax = this.tax.tax;

      this.api.saveUpdateTax(this.region, this.auth.getToken(), isAddTax).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.addTaxModal.hide();
          // this.region.taxes.push(this.tax);
          this.toastr.success(data.msg);
          this.tax.particular = ""
          this.tax.tax = ""

          // this.taxsData = this.region;
          // console.log(this.taxsData);
          this.getTaxesData();
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  onDeleteTax(taxes, index) {
    if (confirm("Are you sure you want to delete this tax?")) {
      this.loading = true;
      var params = {
        "taxStandardId": taxes._id,
      }
      this.api.deleteTax(params, this.auth.getToken())
        .subscribe(
          data => {
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.getTaxesData();
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
    this.taxsData = Object.keys(groupedCollection).map(name => ({ name, data: groupedCollection[name] }));

  }

}
