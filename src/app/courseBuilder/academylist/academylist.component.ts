import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-academylist',
  templateUrl: './academylist.component.html',
  styleUrls: ['./academylist.component.css']
})
export class AcademylistComponent implements OnInit {

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

  constructor(public auth: AuthserviceService,private toastr: ToastrService,
    public api: ApiServiceService,private router: Router,public sanitizer: DomSanitizer) { }

    ngOnInit() {
      this.loading=true;
      this.opacity="opacity";
      this.retrieveAcademies(this.startingValue, this.lastValue);
    }
  
    public check(): boolean {
      return this.loading ? true : false;
    }
  
    public retrieveAcademies(startingValue : number,lastValue : number):void{
      this.token = this.auth.getToken()
      this.api.academyListing({"startingValue": startingValue,"lastValue" : lastValue}, this.token).subscribe(data=>{
        console.log("Academies:", data);
          if(data.status){
            var exceljsonobj = [];
            for (var v in data.data)
            {
  
              var Url = data.data[v].url !== "" ? data.data[v].url : "http://35.173.122.237:8080/cb-template-buy-now?id=" + data.data[v].createdById + "&academy=" + data.data[v]._id;
              
              exceljsonobj.push({
                "id": data.data[v]._id,
                "name" : data.data[v].name,
                "url" : Url
              });
            }
            this.receivedData = exceljsonobj;
            this.isDivVisible = this.receivedData.length > 0 ? true : false;
            if(this.flag){
              this.flag = false;
              this.maxNextClick = Math.floor(data.count / 10);            
              this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
            }
          }
          this.loading=false;
          this.opacity="";
          return;
        },
        err=>{
          this.loading=false;
          this.opacity="";
          console.log(err)
          return
        }
      )
    }
  
    public onCreateLandingPage_Clicked(): void {
      this.router.navigate(['course-template-categories']);
    }
  
    onPaginaion_Clicked(data){
      if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
        this.startingValue = this.lastValue;
        this.lastValue += 10; 
        this.loading=true;
        this.opacity="opacity";
        this.retrieveAcademies(this.startingValue, this.lastValue);
        this.maxNextClick -= 1;
        this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
        this.isPreviousDisabled = "";
      }
      else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
        this.lastValue = this.startingValue;
        this.startingValue -= 10;
        this.loading=true;
        this.opacity="opacity";
        this.retrieveAcademies(this.startingValue, this.lastValue);
        this.maxNextClick += 1;
        this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
        this.isNextDisabled = "";
      }
    }
  
    onManage_Clicked(data){
      this.auth.sendAcademyId(data.id);  
      this.auth.sendAcademyUrl(data.url);      
      this.router.navigate(['course-builder-dashboard']);
    }
}
