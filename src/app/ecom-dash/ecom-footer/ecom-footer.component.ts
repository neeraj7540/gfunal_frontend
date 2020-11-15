import { Component, OnInit, Input } from '@angular/core';
import {
  EcomFooterValues
} from '../../ecom-footer-values'
@Component({
  selector: 'app-ecom-footer',
  templateUrl: './ecom-footer.component.html',
  styleUrls: ['./ecom-footer.component.css']
})
export class EcomFooterComponent implements OnInit {

  @Input() footerData: any = {}



  About: EcomFooterValues[] = [
    {
      name: 'Prince',
      link: '#'
    },
    {
      name: 'prince@gmail.com',
      link: '#'
    },
    {
      name: '9888441786',
      link: '#'
    },
    {
      name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      link: '#'
    }
  ]

  Products: EcomFooterValues[] = [
    {
      name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      link: '#'
    },

  ]

  Help: EcomFooterValues[] = [
    {
      name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      link: '#'
    },
  ]
  constructor() {

    console.log(this.footerData);
  }

  ngOnInit() {
  }

}
