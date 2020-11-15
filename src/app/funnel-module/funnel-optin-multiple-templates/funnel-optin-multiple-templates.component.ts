import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from '../constants.service';
// import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-funnel-optin-multiple-templates',
  templateUrl: './funnel-optin-multiple-templates.component.html',
  styleUrls: ['./funnel-optin-multiple-templates.component.css']
})
export class FunnelOptinMultipleTemplatesComponent implements OnInit {

  public loading: boolean = false;
  public funnelSteps: Array<any> = [];
  public funnelID: string;
  public name: string;
  funnelName: string;


  constructor(
    private api: ApiService,
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    public constants: ConstantsService,
    private router: Router) { }



  ngOnInit() {
    console.log("FunnelOptinMultipleTemplatesComponent");
    this.checkQueryIsAvailable();
    this.getProfile();
  }

  getProfile() {
    this.api.getProfile(this.auth.getToken()).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"]
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }
  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.funnelId) {
          return this.router.navigate(['/funnel-list'])
        }
        if (!data.template) {
          this.constants.isTemplatesShowing = true;
          // return this.router.navigate(['/funnel-list'])

        } else {
          this.constants.isTemplatesShowing = false;

        }
        this.funnelID = data.funnelId;
        if (data.name) {
          this.funnelName = data.name;
        }
        return
      }
    )
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  // openSubHeaderTab(e) {
  //   console.log(e);
  //   this.selectedSubTab = e;
  // }

  // opensettings(){
  //   this.router.navigate(['settings'],{relativeTo: this.activeRoute})
  // }

  // opensteps(){
  //   this.router.navigate(['steps'],{relativeTo: this.activeRoute})
  // }

}
