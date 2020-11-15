import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ecom-dash-editprofile',
  templateUrl: './ecom-dash-editprofile.component.html',
  styleUrls: ['./ecom-dash-editprofile.component.css']
})

export class EcomDashEditprofileComponent implements OnInit {

  constructor(private productService: ProductService,private api: ApiService,private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private auth: AuthserviceService,private router: Router) { }

    public loading: boolean = false;
    createrID: string;
    ecommerceSiteID: string;
    public headerData: any;

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();
    this.previewAccount();
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

  public previewAccount(): void {
    var params = {};
    this.api.previewAccount(params, this.auth.getEcommercerUserToken()).subscribe(data => {
      console.log("profile data:", data);
        if (data.status) {
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

}