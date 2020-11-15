import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-funnel-optin-step-template',
  templateUrl: './funnel-optin-step-template.component.html',
  styleUrls: ['./funnel-optin-step-template.component.css']
})
export class FunnelOptinStepTemplateComponent implements OnInit {

  template: string;
  funnelID: string;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private constants: ConstantsService) { }


  ngOnInit() {
    console.log("FunnelStepsComponent");
    this.checkQueryIsAvailable();
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
        return
      }
    )
  }

  openStepSetting() {
    this.router.navigate(["/funnel-optin-multiple-templates/steps/funnel-step-settings-fields"], { queryParams: { "funnelId":  this.funnelID, "template": this.template } });
  }
}
