import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-funnel-add-step-sidebar',
  templateUrl: './funnel-add-step-sidebar.component.html',
  styleUrls: ['./funnel-add-step-sidebar.component.css']
})
export class FunnelAddStepSidebarComponent implements OnInit {

  public loading: boolean = false;
  public funnelSteps: Array<any> = [];
  public funnelID: string;
  public funnelStepName: string;
  public selectedStep: number;
  @ViewChild('addStepModal',{static: false}) funnelStepModal: any;

  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private auth: AuthserviceService,
    private router: Router,
    private toastr: ToastrService,
    private constant: ConstantsService
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getFunnelSteps();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.funnelId) {
          return this.router.navigate(['/funnel-list'])
        }
        this.funnelID = data.funnelId;
        return
      }
    )
  }

  getFunnelSteps() {
    var params = {
      "funnelID": this.funnelID,
      "startingValue": 0,
      "lastValue": 100
    }
    this.api.getFunnelSteps(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.data.status) {
          this.loading = false;
          this.funnelSteps = data.data.data;
          this.constant.funnelStepsList = data.data.data;

          console.log(this.funnelSteps);
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



  onStepDelete(item, index) {
    if (confirm("Are you sure to delete this step?.")) {
      this.loading = true;
      var params = { "funnelID": this.funnelID, "stepID": item._id };
      this.api.deleteFunnelStep(params, this.auth.getToken()).subscribe(data => {
        this.loading = false;
        if (data.status) {
          this.funnelSteps.splice(index, 1);
          this.toastr.success(data.msg);
        }
        return;
      },
        err => {
          this.loading = false;
          this.toastr.warning(err.msg);
          console.log(err);
          return;
        }
      )
    }
  }

  addFunnelStep() {
    // this.loading = true;
    if (!this.funnelStepName)
      this.toastr.warning("Please enter step name");
    else {
      var params = { "funnelID": this.funnelID, "step_name": this.funnelStepName };

      this.funnelSteps.push(params);
      this.funnelStepModal.hide();
      this.constant.funnelStepsList = this.funnelSteps;
      this.funnelStepName = null;
    }
    // this.api.addFunnelStep(params, this.auth.getToken()).subscribe(data => {
    //   this.loading = false;
    //   if (data.status) {
    //     this.funnelStepModal.hide();
    //     this.toastr.success(data.msg);
    //   }
    //   return;
    // },
    //   err => {
    //     this.loading = false;
    //     this.toastr.warning(err.msg);
    //     console.log(err);
    //     return;
    //   }
    // )
  }

  onSelectedStep(step: any, index: number) {
    this.selectedStep = index;
    this.constant.funnelStepsData = step;
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
