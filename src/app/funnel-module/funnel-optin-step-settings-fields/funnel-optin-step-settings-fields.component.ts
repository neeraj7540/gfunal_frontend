import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-funnel-optin-step-settings-fields',
  templateUrl: './funnel-optin-step-settings-fields.component.html',
  styleUrls: ['./funnel-optin-step-settings-fields.component.css']
})
export class FunnelOptinStepSettingsFieldsComponent implements OnInit {

  template: string;
  funnelID: string;
  public funnelStep: any = {};
  public loading: boolean = false;
  public data: any;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private constants: ConstantsService,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }


  ngOnInit() {
    console.log("FunnelStepsComponent");
    this.checkQueryIsAvailable();

    // this.constants.getData().subscribe(data => {
    //   console.log(data.step_name);
    //   this.data = data;
    // })
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (data.template) {
          this.constants.isTemplatesShowing = false;
          // return this.router.navigate(['/funnel-list'])
        }
        if (!data.funnelId) {
          return this.router.navigate(['/funnel-list'])
        }
        this.funnelID = data.funnelId;
        this.template = data.template;
        this.funnelStep.stepName = this.constants.funnelStepsData.step_name;

        return
      }
    )
  }

  updateFunnel() {
    if (!this.funnelStep.funnelPath)
      this.toastr.warning("Please enter funnel path");
    else {
      this.funnelStep.funnelID = this.funnelID;
      this.funnelStep.funnelType = this.constants.selectedTemplateCatType;
      this.funnelStep.funnelTempName = this.template;

      this.api.addFunnelStep(this.funnelStep, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (data.status) {
            this.toastr.success(data.msg);

            console.log(this.funnelStep);
            var funnelName = localStorage.getItem("funnel_name")
            this.router.navigate(['/funnel-optin-multiple-templates/steps'],
              { queryParams: { funnelId: this.funnelID, name: funnelName } });
            return
          }
          return
        },
        err => {
          console.log(err)
          this.loading = false;
          return
        }
      )
    }
  }


  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }
}
