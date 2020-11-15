import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-lp-dashboard',
  templateUrl: './lp-dashboard.component.html',
  styleUrls: ['./lp-dashboard.component.css']
})
export class LpDashboardComponent implements OnInit {

  public data: any;
  public landdingPageID: string;
  opacity:string = "";
  loading: boolean=false;
  token:string;
  leadsCount : string = "";
  contactsCount : string = "";
  trafficRateCount : string = "";
  affilatedEarningCount : string = "";
  name:string = this.auth.getUserName();

  constructor(private auth: AuthserviceService,private activatedRout : ActivatedRoute,
              private route: Router, private api: ApiService) { }

  ngOnInit() {
    this.checkValue();
    this.loading=true;
    this.opacity="opacity";
    this.retrievelDashboardData();
  }

  public checkValue():void{
    this.data = this.activatedRout.queryParams.subscribe(value=>{
        this.landdingPageID = value.landdingPageID

        if(!this.landdingPageID)
          this.route.navigate(['/lp-lists']);
      }
    )
  }

  public check():boolean{
    if(this.loading){
      return true
    }
    else {
      return false
    }
  }

  retrievelDashboardData() : void {
    this.token = this.auth.getToken()
    this.api.getTemplateDashboardData({"template_id": this.landdingPageID}).subscribe(data=>{  
      if(data.status){
          this.leadsCount = data.data.leads;
          this.contactsCount = data.data.Contacts;
          this.trafficRateCount = data.data.trafficRate;
          this.affilatedEarningCount = data.data.affilatedEarning;
        }
        this.loading=false;
        this.opacity="";
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

}
