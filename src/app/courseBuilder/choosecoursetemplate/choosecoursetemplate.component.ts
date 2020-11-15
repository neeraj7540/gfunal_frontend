import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choosecoursetemplate',
  templateUrl: './choosecoursetemplate.component.html',
  styleUrls: ['./choosecoursetemplate.component.css']
})
export class ChoosecoursetemplateComponent implements OnInit {

  public data: any;
  public categoryType: string;
  public academyId: string;
  name:string = this.auth.getUserName();

  constructor(private auth: AuthserviceService, private route: Router,private api: ApiService,
              private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
  }
  public checkValue():void{
    this.data = this.activatedRout.queryParams.subscribe(value=>{
        this.categoryType = value.categoryType
        this.academyId = value.academyId
      }
    )
  }
}