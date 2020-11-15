import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboardcontent',
  templateUrl: './dashboardcontent.component.html',
  styleUrls: ['./dashboardcontent.component.css']
})
export class DashboardcontentComponent implements OnInit {

  opacity:string = "";
  loading: boolean=false;
  token:string;
  leadsCount : string = "";
  subscribersCount : string = "";
  ordersCount : string = "";
  monthlyEnrollmentCount : string = "";
  name:string = this.auth.getUserName();

  constructor(private auth: AuthserviceService, private api: ApiService,private route: Router) { }

  ngOnInit() {
    this.loading=true;
    this.opacity="opacity";
    this.retrievelDashboardData();
  }

  openTemplate(){
    this.route.navigate(['/template-categories'])
  }

  retrievelDashboardData() : void {
    this.token = this.auth.getToken()
    this.api.getDashboardData("",this.token).subscribe(data=>{
      debugger;
        if(data.status){
          this.loading=false;
          this.opacity="";
          this.leadsCount = data.data.leads;
          this.subscribersCount = data.data.subscriber;
          this.ordersCount = data.data.orders;
          this.monthlyEnrollmentCount = data.data.monthly_enrolment;
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
    if(this.loading){
      return true
    }
    else {
      return false
    }
  }

}
