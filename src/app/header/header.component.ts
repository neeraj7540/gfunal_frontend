import { Component, OnInit } from '@angular/core';
import {Headervalues} from '../headervalues'
import {DashboardComponent} from '../dashboard/dashboard.component'
import { Route } from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  route: Route[] = [
    {
    path: 'dashboard',
    component: DashboardComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
]

  header: Headervalues[] = [{
    linkheading:'Home',
    link:'#'
  },
  {
    linkheading:'About',
    link:'#'
  },
  {
    linkheading:'Pricing',
    link:'#'
  },
  {
    linkheading:'Packages',
    link:'#'
  },
  {
    linkheading:'Contact us',
    link:'#'
  }
];

signin: Headervalues = {
  linkheading: 'Sign in',
  link:'signup'
}

signup: Headervalues = {
  linkheading:' Sign up',
  link:'login'
}

  constructor() { }

  ngOnInit() {
  }

}
