import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-affiliate-content',
  templateUrl: './affiliate-content.component.html',
  styleUrls: ['./affiliate-content.component.css']
})
export class AffiliateContentComponent implements OnInit {


  constructor(public router: Router, public auth: AuthserviceService) { }

  ngOnInit() {
  }

  onSettings_Clicked() {
    this.router.navigate(['/common-settings']);
  }

  onCourseBuilder_Clicked() {
    this.router.navigate(['/coursebuilderpages']);
  }
  onLanding_Clicked() {
    this.router.navigate(['/landing-pages']);
  }
  onEcommerce_Clicked() {
    this.router.navigate(['/ecommerce-pages']);
  }
  onFunnels_Clicked(){
    this.router.navigate(['/funnels-pages']);
  }
}