import { Component, OnInit, Input } from '@angular/core';
import { Headervalues } from '../../headervalues'
import { LandingpageComponent } from '../../landingpage/landingpage.component'
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ecom-dash-header',
  templateUrl: './ecom-dash-header.component.html',
  styleUrls: ['./ecom-dash-header.component.css']
})
export class EcomDashHeaderComponent implements OnInit {

  @Input() name: string;

  // @Input() headerDat: any = {};

  public ecomHeaderData: any = {};
  public menuCollectionsPages: any = [];

  public ecommerceSiteId: string;
  public createdById: string;
  public isUserLoggedIn: boolean = false;
  userName: string = "";

  @Input() set headerDat(data: any) {
    if (data) {
      this.header = data;
      console.log("Header Data::::: ", data);
      this.ecomHeaderData = data.headerInformation;
      this.menuCollectionsPages = data.collectionAndPages
    }
  }

  get headerDat(): any {
    return this.header;
  }


  routes: Route[] = [{
    path: 'home',
    component: LandingpageComponent
  }]


  header: Headervalues[] = [{
    linkheading: 'Home',
    link: ''
  },
  {
    linkheading: 'Blog',
    link: ''
  },
  {
    linkheading: 'Support',
    link: ''
  },
  {
    linkheading: 'Account',
    link: ''
  }
  ];
  signin: Headervalues = {
    linkheading: 'Signin',
    link: '#'
  }

  signup: Headervalues = {
    linkheading: ' Signup',
    link: '#'
  }
  constructor(
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    private router: Router, private api: ApiService
  ) {
    this.isUserLoggedIn = this.auth.isEcommerceUserLoggedIn();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id)
          return this.router.navigate(['/ecom-dash-dashboard']);

        this.ecommerceSiteId = data.id;
        this.createdById = data.createdById;
        return
      }
    )
  }

  logout() {
    this.auth.ecommerceLogout(this.ecommerceSiteId, this.createdById);
  }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isEcommerceUserLoggedIn();
    this.checkQueryIsAvailable();
    this.previewAccount();
  }

  public previewAccount(): void {
    var params = {};
    this.api.previewAccount(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      if (data.status)
        this.userName = data.data.name;
      return;
    },
      err => {
        console.log(err)
        return
      }
    )
  }

  login() {
    this.router.navigate(["/ecom-login"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }
  openMenu(menuItem: any) {
    this.router.navigate(["/ecom-dash-all-products"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById, name: menuItem.name, collection: menuItem.content.collectionId } })
  }

  openAddress() {
    this.router.navigate(["/ecom-dash-saved-address"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }

  openWishlist() {
    this.router.navigate(["/ecom-dash-wishlist"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }

  openCart() {
    this.router.navigate(["/ecom-dash-cart"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }

  openOrderlist() {
    this.router.navigate(["/ecom-dash-orderlist"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }

  openDashboard() {
    this.router.navigate(["/ecom-dash-dashboard"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }

  openProfile() {
    this.router.navigate(["/ecom-dash-edit-profile"], { queryParams: { id: this.ecommerceSiteId, createdById: this.createdById } })
  }
}
