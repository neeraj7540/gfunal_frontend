import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-funnel-steps',
  templateUrl: './funnel-steps.component.html',
  styleUrls: ['./funnel-steps.component.css']
})
export class FunnelStepsComponent implements OnInit {

  stepOptin: boolean = true;
  selectedTab: string = "optin";
  // isTemplatesShowing: boolean = true;
  loading: boolean;
  templates: Array<any> = [];

  selectedCategory: string;

  selectedStep: any;
  funnelID: string;
  constructor(
    private api: ApiService,
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    public constants: ConstantsService,
    private router: Router,
    private constant: ConstantsService) {

    // this.currentRoute = router.url;
    console.log(router);

  }

  ngOnInit() {
    console.log("FunnelStepsComponent");
    this.checkQueryIsAvailable();
    this.getFunnelTemplates("Optin");
    this.constant.selectedTemplateCatType = "Optin"
    this.constant.funnelStepsData = undefined
    // this.constant.getData().subscribe(data => {
    //   this.selectedStep = data;
    // })
  }

  public getFunnelTemplates(templateCat: string): void {
    let params = {
      "cat": templateCat,
      "startingValue": "0",
      "lastValue": "100"
    }

    this.api.funnelStepTemplates(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          return
        }
        this.templates = data.data.data
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  onChangeCategory(event) {
    let params = {
      "catname": this.selectedCategory
    }

    this.api.funnelStepTemplatesByCategory(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          return
        }
        this.templates = data.data.data
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.template) {
          this.constants.isTemplatesShowing = true;
          // return this.router.navigate(['/funnel-list'])

        }
        if (!data.funnelId) {
          return this.router.navigate(['/funnel-list'])
        }
        this.funnelID = data.funnelId;

        return
      }
    )
  }
  displayTabContent(tab) {
    this.selectedTab = tab;
    console.log(this.selectedTab);
    this.constant.selectedTemplateCatType = tab;
    this.getFunnelTemplates(tab);

  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  public previewTemplate(): void {
    // alert(this.temp_name)
  }

  onChoose(template: any) {
    if (this.constant.funnelStepsData)
      this.router.navigate(["/funnel-optin-multiple-templates/steps/funnel-step-template"], { queryParams: { "funnelId": this.funnelID, "template": template._id } })
    else
      this.toastr.warning("Please select step first");
  }

}
