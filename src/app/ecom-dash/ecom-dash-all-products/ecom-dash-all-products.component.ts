import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-ecom-dash-all-products',
  templateUrl: './ecom-dash-all-products.component.html',
  styleUrls: ['./ecom-dash-all-products.component.css']
})
export class EcomDashAllProductsComponent implements OnInit {
  public headerData: any;


  public loading: boolean = false;

  public collectionName: string;
  private createrID: string;
  private ecommerceSiteID: string;
  private collectionID: string;


  public collectionProducts: any = []


  constructor(
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public router: Router,
    private api: ApiService,
    private productService: ProductService
  ) { }
  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();

  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          // return this.router.navigate(['/cb-template-buy-now']);
        }
        this.createrID = data.createdById;
        this.ecommerceSiteID = data.id;
        this.collectionID = data.collection;
        this.collectionName = data.name;
        this.fetchHeaderData();
        this.fetchProducts();
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
          console.log(this.headerData);

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

  public fetchProducts(): void {
    var params = {
      "startingValue": 0,
      "lastValue": 100,
      "ecommerceSiteId": this.ecommerceSiteID,
      "CollectionId": this.collectionID,
      "createdById": this.createrID
    }
    this.api.getCollectionProducts(params).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.collectionProducts = data.data
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

  openProductDetails(product: any) {
    this.productService.saveProduct(product);
    this.router.navigate(["/ecom-dash-product-details"], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID, collectionId: this.collectionID,
    name:this.collectionName } })

  }
}
