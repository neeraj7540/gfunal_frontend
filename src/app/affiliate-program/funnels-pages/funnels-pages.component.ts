import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-funnels-pages',
  templateUrl: './funnels-pages.component.html',
  styleUrls: ['./funnels-pages.component.css']
})
export class FunnelsPagesComponent implements OnInit {

  opacity: string = "";
  public loading: boolean = false;
  public receivedData: Array<any> = []
  isDivVisible: boolean = false;
  name: string = this.auth.getUserName();
  isPreviousDisabled: string = "disabled";
  isNextDisabled: string = "";
  maxNextClick: number = 0;
  startingValue: number = 0;
  lastValue: number = 10;
  flag: boolean = true;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retrieveFunnels(this.startingValue, this.lastValue);
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public retrieveFunnels(startingValue: number, lastValue: number): void {
    let params = {
      type: "funnel",
      startingValue: startingValue,
      lastValue: lastValue
    }
    this.api.listingAccordingToModule(params, this.auth.getToken()).subscribe(data => {
      console.log("funnel page data:", data);
      if (data.status) {
        this.receivedData = data.data;
        this.isDivVisible = this.receivedData.length > 0 ? true : false;
        if (this.flag) {
          this.flag = false;
          this.maxNextClick = Math.floor(data.count / 10);
          this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
        }
      }
      this.loading = false;
      this.opacity = "";
      return;
    },
      err => {
        this.loading = false;
        this.opacity = "";
        console.log(err)
        return
      }
    )
  }

  onPaginaion_Clicked(data) {
    if (data.target.textContent == "Next >>" && this.maxNextClick > -1) {
      this.startingValue = this.lastValue;
      this.lastValue += 10;
      this.loading = true;
      this.opacity = "opacity";
      this.retrieveFunnels(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if (data.target.textContent == "<< Previous" && this.isPreviousDisabled == "") {
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading = true;
      this.opacity = "opacity";
      this.retrieveFunnels(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }

  onManage_Clicked(data) {
    this.router.navigate(['affiliate-dashboard'], { queryParams: { type: "funnel", affilateId: data._id, link: data.link } });
  }

  onJoin_Clicked(data) {
    this.router.navigate(['terms'], { queryParams: { type: "funnel", affilateId: data._id, link: data.link } });
  }
}