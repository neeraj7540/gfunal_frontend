import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  public token:string;
  public loading: boolean=false;
  opacity:string = "";
  public landdingPageID: string;
  public receivedData: Array<any> = [];
  public data: any;
  name:string = this.auth.getUserName();
  public domain : string;
  public domainId : string = "";
  public SaveUpdateBtn : string = "Save Domain";
  isDivVisible : boolean = false;
  isPreviousDisabled : string = "disabled";
  isNextDisabled : string = "";
  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;

  constructor(private router: Router,private activatedRout : ActivatedRoute, private toastr: ToastrService,
              private auth : AuthserviceService, public api: ApiService) { }

  ngOnInit() {
    this.checkValue();
    this.loading=true;
    this.opacity="opacity";
    this.retrievelistingDomains(this.startingValue, this.lastValue);
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

  private retrievelistingDomains(startingValue : number,lastValue : number ):void{
    this.token = this.auth.getToken()
    this.api.listingDomains({"startingValue": startingValue,"lastValue" : lastValue}, this.token).subscribe(data=>{
      this.loading=false;
      this.opacity="";
        if(data.status)
        {
          this.receivedData = data.data;
          this.isDivVisible = this.receivedData.length > 0 ? true : false;

          if(this.flag){
            this.flag = false;
            this.maxNextClick = Math.floor(data.count / 10);
            this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
          }
        }
        return;
      },
      err=>{
        this.loading=false;
        this.opacity="";
        console.log(err)
        return;
      }
    )
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

  SaveDomain(data){
    if(!this.domain){
      return this.toastr.warning("Please enter domain.")
     }

     this.loading=true;
     this.opacity="opacity";

     var apiEndpoint = "";
     var parameters;
      if(data.target.text == "Save Domain")
      {
        parameters = {
          "domain" : this.domain
        };
        apiEndpoint = "/domain/createDomain";
      }
      else
      {
        parameters = {
          "domainId" : this.domainId,
          "newDomain" : this.domain
        };
        apiEndpoint = "/domain/updatedDomain";
      }

      this.api.createDomain(parameters, this.token, apiEndpoint).subscribe(data=>{
          this.loading=false;
          this.opacity = "";
          this.toastr.success(data['msg']);
          this.domain = "";
          this.SaveUpdateBtn = "Save Domain";
          this.retrievelistingDomains(this.startingValue, this.lastValue);
          return;
        },
        err=>{
          console.log(err)
          this.loading=false;
          this.opacity = "";
          this.toastr.warning(err.error.msg)
        }
      )

  }

  UpdateDomain(data){
    this.SaveUpdateBtn = "Update Domain";
    this.domain = data.domain;
    this.domainId = data._id;
  }

  onPaginaion_Clicked(data){
    if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
      this.startingValue = this.lastValue;
      this.lastValue += 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrievelistingDomains(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrievelistingDomains(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }
}
