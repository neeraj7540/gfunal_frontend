import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-saved-landing-page',
  templateUrl: './saved-landing-page.component.html',
  styleUrls: ['./saved-landing-page.component.css']
})
export class SavedLandingPageComponent implements OnInit {

    opacity:string = "";
    loading: boolean=false;
    token:string;
    receivedData:Array<any>=[];
    landdingPageID: string;
    data: any;
    name:string = this.auth.getUserName();

    constructor(public auth: AuthserviceService,public router: Router,public toastr: ToastrService,
                public api: ApiService,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
    this.loading=true;
    this.opacity="opacity";
    this.retrieveLandingPages()
  }

  public checkValue():void{
    this.data = this.activatedRout.queryParams.subscribe(
      value=>{
        this.landdingPageID = value.landdingPageID

        if(!this.landdingPageID)
          this.router.navigate(['/lp-lists']);
      }
    )
  }

  public retrieveLandingPages():void{
    this.token = this.auth.getToken()
    this.api.draftedListofUserLandingPage({"landingPageID" : this.landdingPageID,"startingValue": 0,"lastValue" : 10}, this.token).subscribe(
      data=>{
        this.loading=false;
        this.opacity="";
        if(data.status)
          this.receivedData=data.data.data
        return
      },
      err=>{
        this.loading=false;
          this.opacity="";
        console.log(err)
        return
      }
    )
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

  onSelectCategory(){
    this.router.navigate(['/choosetemplate'],
    { queryParams: 
      { 
        categoryType: this.auth.getLandingPageCategory(), 
        callingPage:"SaveLanding", 
        landdingPageID : this.landdingPageID
      } 
    });
  }
}