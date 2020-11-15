import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-dashboardsidebar',
  templateUrl: './dashboardsidebar.component.html',
  styleUrls: ['./dashboardsidebar.component.css']
})
export class DashboardsidebarComponent implements OnInit {

  @Input() name : string;

  constructor(public router: Router, public auth: AuthserviceService) { }

  ngOnInit() {
  }

  onSubCategory_Selected(e){
    switch(e.target.text){
      case 'Landing Page': {
        this.router.navigate(['/lp-lists']);
        break;
      }
      case 'Blog': {
        this.router.navigate(['/blog-list']);
        break;
      }
      case 'E-commerce': {
        this.router.navigate(['/ecommerce/shop-list'])
        break;
      }
      case 'Course Builder': {
        this.router.navigate(['/academylist']);
        break;
      }
    }
  }

  onSettings_Clicked(){
    this.router.navigate(['/common-settings']);
  }

  onAffiliate_Clicked(){
    this.router.navigate(['/affiliate-program']);
  }

  openFunnels(e){
    this.router.navigate(['/funnel-dashboard']);
  }
}
