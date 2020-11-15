import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-lp-lists',
  templateUrl: './lp-lists.component.html',
  styleUrls: ['./lp-lists.component.css']
})
export class LpListsComponent implements OnInit {

  opacity:string = "";
  public loading: boolean=false;
  public token:string;
  public receivedData:Array<any>=[]
  isDivVisible: boolean = false;
  name:string = this.auth.getUserName();
  public params: any;
  isPreviousDisabled : string = "disabled";
  isNextDisabled : string = "";
  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;

  constructor(public auth: AuthserviceService,public api: ApiService,private router: Router,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
    this.opacity="opacity";
    this.retrieveLandingPages(this.startingValue, this.lastValue);
  }

  public retrieveLandingPages(startingValue : number,lastValue : number):void{
    this.token = this.auth.getToken()
    this.api.allLandingPages({"startingValue": startingValue,"lastValue" : lastValue}, this.token).subscribe(data=>{
        this.loading=false;
        this.opacity="";
        if(data.status){
          this.receivedData = data.data;
          if(this.receivedData)
            this.isDivVisible = this.receivedData.length > 0 ? true : false;
          if(this.flag){
            this.flag = false;
            this.maxNextClick = Math.floor(data.count / 10);
            console.log("Count value: ", this.maxNextClick);
            this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
          }
        }
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

  onManage_Clicked(e){
    this.auth.sendSiteName(e.site_name);
    this.auth.sendLandingPageCategory(e.landingPageCategory);
    this.router.navigate(['/lp-dashboard'],{ queryParams: { landdingPageID: e._id } });
  }

  onPreview_Clicked(e){
    this.router.navigate(['/preview-landing-page'],{ queryParams: { template_id: e._id,callingMethod: "preview" } });
  }

  public check():boolean{
    if(this.loading)
      return true;
    else 
      return false;
  }

  onCreateLandingPage_Clicked(){
    this.router.navigate(['/template-categories']);
  }

  onPaginaion_Clicked(data){
    if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
      this.startingValue = this.lastValue;
      this.lastValue += 10; 
      this.loading=true;
      this.opacity="opacity";
      this.retrieveLandingPages(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrieveLandingPages(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }
}
