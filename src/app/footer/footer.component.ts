import { Component, OnInit } from '@angular/core';
import {
  FooterValues
} from '../footervalues'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  About: FooterValues[] = [
    {
    name: 'Locations',
    link:'#'
    },
    {
      name:'Meet The Team',
      link:'#'
    },
    {
      name:'Origin Story',
      link:'#'
    },
    {
      name:'Careers',
      link:'#'
    }
]

Products: FooterValues[] = [
  {
    name:'What is Gfunl?',
    link:'#'
  },
  {
    name:'What is Etison Editor?',
    link:'#'
  },
  {
    name:'What is Actionetics?',
    link:'#'
  },
  {
    name:'What is Backpack?',
    link:'#'
  }
]

Help: FooterValues[] = [
  {
    name:'Gfunl Blog',
    link:'#'
  },
  {
    name:'Documentation',
    link:'#'
  },
  {
    name:'Official Facebook Group',
    link:'#'
  },
  {
    name:'Support Chat',
    link:'#'
  }
]

  constructor() { }

  ngOnInit() {
  }

}
