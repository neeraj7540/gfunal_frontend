import { Component, OnInit, Input } from '@angular/core';
import { Headervalues } from '../../headervalues'
import { FooterValues } from '../../footervalues'
import { LandingpageComponent } from '../../landingpage/landingpage.component'
import { Route, ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-ecom-dash-dashboard',
  templateUrl: './ecom-dash-dashboard.component.html',
  styleUrls: ['./ecom-dash-dashboard.component.css']
})

export class EcomDashDashboardComponent implements OnInit {

  @Input() name: string;
  public loading: boolean = false;

  public sliderImage: any;
  public imageWithText: any = { image: "" };
  public footer: any;
  public bestOfStore: any;

  public ecommerceSiteId: string;
  public createdById: string;

  public headerData: any;
  public menuCollectionsPages: any = []

  routes: Route[] = [{
    path: 'home',
    component: LandingpageComponent
  }]


  header: Headervalues[] = [{
    linkheading: 'Men',
    link: '#'
  },
  {
    linkheading: 'Women',
    link: '#'
  },
  {
    linkheading: 'Children',
    link: '#'
  },
  {
    linkheading: 'Hosuehold',
    link: '#'
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
    public router: Router,
    private productService: ProductService,
    private api: ApiService
  ) { }


  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/ecom-dash-dashboard']);
        }
        this.ecommerceSiteId = data.id
        this.createdById = data.createdById
        this.fetchHeaderData();
        this.fetchBodyData();
        return
      }
    )
  }
  logout() {
    this.auth.logout()
  }
  About: FooterValues[] = [
    {
      name: 'Locations',
      link: '#'
    },
    {
      name: 'Meet The Team',
      link: '#'
    },
    {
      name: 'Origin Story',
      link: '#'
    },
    {
      name: 'Careers',
      link: '#'
    }
  ]

  Products: FooterValues[] = [
    {
      name: 'What is Gfunl?',
      link: '#'
    },
    {
      name: 'What is Etison Editor?',
      link: '#'
    },
    {
      name: 'What is Actionetics?',
      link: '#'
    },
    {
      name: 'What is Backpack?',
      link: '#'
    }
  ]

  Help: FooterValues[] = [
    {
      name: 'Gfunl Blog',
      link: '#'
    },
    {
      name: 'Documentation',
      link: '#'
    },
    {
      name: 'Official Facebook Group',
      link: '#'
    },
    {
      name: 'Support Chat',
      link: '#'
    }
  ];
  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();

  }



  public fetchHeaderData(): void {
    // var params = {
    //   "ecommerceSiteId": "5e68cf550426a900171dc2dd",
    //   "createdById": "5e58bb37843a740017f8f020"
    // }

    var params = {
      "ecommerceSiteId": this.ecommerceSiteId,
      "createdById": this.createdById
    }
    this.api.getEcommerceHeaderData(params).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.headerData = data.data;
          console.log("Header data is:", this.headerData);

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
  public fetchBodyData(): void {
    var params = {
      "ecommerceSiteId": this.ecommerceSiteId,
      "createdById": this.createdById
    }
    this.api.getEcommerceBodyData(params).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.sliderImage = data.data.sliderInformation.slideImages;
          this.imageWithText = data.data.imageWithText;
          this.imageWithText.imageInfo = JSON.parse(this.imageWithText.imageInfo);
          this.imageWithText.image = this.imageWithText.imageInfo.data.Location;


          console.log(this.imageWithText);

          this.footer = data.data.footer;
          this.bestOfStore = data.data.bestOfStore.productList;
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
    this.router.navigate(["/ecom-dash-product-details"], {
      queryParams: {
        id: this.ecommerceSiteId, createdById: this.createdById, collectionId: "",
        name: product.descriptionTitle
      }
    })

  }
}
