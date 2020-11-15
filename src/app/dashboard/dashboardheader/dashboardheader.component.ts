import { Component, OnInit, Input } from '@angular/core';
import { Headervalues } from '../../headervalues'
import { LandingpageComponent } from '../../landingpage/landingpage.component'
import { Route, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {

  @Input() name: string;

  // @Input() headerDat: any = {};


  
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
    private auth: AuthserviceService
    ) {
    
   }

  logout() {
    this.auth.logout()
  }

  ngOnInit() {
  }

  

}
