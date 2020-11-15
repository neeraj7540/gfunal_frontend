import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-choosetemplate',
  templateUrl: './choosetemplate.component.html',
  styleUrls: ['./choosetemplate.component.css']
})
export class ChoosetemplateComponent implements OnInit {

  public data: any;
  public categoryType: string;
  public callingPage: string;
  public landdingPageID: string;
  name:string;

  constructor( private auth: AuthserviceService, private route: Router,
    private api: ApiService,
    private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
    this.getProfile(this.auth.getToken());
  }
  getProfile(token:string){
    this.api.getProfile(token).subscribe(
      data=>{
        console.log("data is ", data)
        this.name=data["data"]["first_name"]+" " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err=>{
        console.log("err is", err)
      }
    )
  }
  public checkValue():void{
    this.data = this.activatedRout.queryParams.subscribe(
      value=>{
        this.categoryType = value.categoryType
        this.callingPage = value.callingPage
        this.landdingPageID = value.landdingPageID

        if(!this.categoryType)
          this.route.navigate(['']);
      }
    )
  }
}
