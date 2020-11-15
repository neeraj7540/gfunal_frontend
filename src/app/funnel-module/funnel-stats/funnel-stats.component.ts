import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-funnel-stats',
  templateUrl: './funnel-stats.component.html',
  styleUrls: ['./funnel-stats.component.css']
})
export class FunnelStatsComponent implements OnInit {

  public name: string;
  public funnelStatsData: Array<any>;
  public funnelStats: any = {};
  public funnels: Array<any>;
  public loading: boolean = false;
  editFunnel: any = {};

  constructor(public auth: AuthserviceService, public api: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getFunnels();
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

  public getFunnels(): void {
    this.api.getFunnels({}, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.funnels = data.data.data;
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

  onDateChange(dateType: string) {
    console.log(this.funnelStats);
    if (!this.funnelStats.startDate) {
      // this.toastr.warning("Please select start date.");
    } else if (!this.funnelStats.endDate) {
      this.toastr.warning("Please select end date.");
    } else if (!this.funnelStats.funnelID) {
      // this.toastr.warning("Please select funnel.");
    } else {
      // const endDateFormat = new DatePipe('en-US').transform(this.funnelStats.endDate, 'dd/MM/yyyy HH:mm:ss');
      let endDate = new Date(this.funnelStats.endDate);
      console.log(endDate.getTime());

      // const startDateFormat = new DatePipe('en-US').transform(this.funnelStats.startDate, 'dd/MM/yyyy HH:mm:ss');
      let startDate = new Date(this.funnelStats.startDate);
      console.log(startDate.getTime());


      var params = {
        "funnelID": this.funnelStats.funnelID,
        "startDate": startDate.getTime(),
        "endDate": endDate.getTime()
      }
      this.api.getFunnelStats(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;

          if (data.status) {
            this.toastr.success(data.msg);
            this.funnelStatsData = data.data.data;
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
