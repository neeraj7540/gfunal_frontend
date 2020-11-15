import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-template-categories',
  templateUrl: './template-categories.component.html',
  styleUrls: ['./template-categories.component.css']
})
export class TemplateCategoriesComponent implements OnInit {

  name:string = this.auth.getUserName();

  constructor(public auth: AuthserviceService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  onSelectCategory(e){
    this.router.navigate(['/choosetemplate'],
    { 
      queryParams: 
      { 
        categoryType: e.target.text, 
        callingPage:"Categories"
      } 
    });
  }
}
