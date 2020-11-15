import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css']
})
export class AffiliateDashboardComponent implements OnInit {

  DashboardCss : string = "nav-link active";
  ReferredAccountCss : string = "nav-link";
  WithdrawlsCss : string = "nav-link";
  isDashboardTabVisible: boolean = true;
  isAccountTabVisible: boolean = false;
  isWithdrawlsTabVisible: boolean = false;
  name:string = this.auth.getUserName();

  constructor(public auth: AuthserviceService,private toastr: ToastrService,
    public api: ApiServiceService,private router: Router,public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  OnNavBar_Clicked(e){
    if(e.target.id === "dashboardtab")
    {
      this.ReferredAccountCss = this.WithdrawlsCss = "nav-link";
      this.DashboardCss = "nav-link active";
      this.isAccountTabVisible = this.isWithdrawlsTabVisible = false;
      this.isDashboardTabVisible = true;
    }
    else if(e.target.id === "accounttab")
    {
      this.DashboardCss = this.WithdrawlsCss = "nav-link";
      this.ReferredAccountCss = "nav-link active";
      this.isDashboardTabVisible = this.isWithdrawlsTabVisible = false;
      this.isAccountTabVisible = true;
    }
    else
    {
      this.ReferredAccountCss = this.DashboardCss = "nav-link";
      this.WithdrawlsCss = "nav-link active";
      this.isAccountTabVisible = this.isDashboardTabVisible = false;
      this.isWithdrawlsTabVisible = true;
    }
  }

}
