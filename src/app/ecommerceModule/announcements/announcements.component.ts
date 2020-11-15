import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  name: string = this.auth.getUserName();
  isPreviousDisabled: string = "disabled";
  isNextDisabled: string = "";
  maxNextClick: number = 0;
  startingValue: number = 0;
  lastValue: number = 10;
  flag: boolean = true;
  isDivVisible: boolean = false;
  receivedData: Array<any> = [];
  path: string;
  private shopID: string;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.checkQueryIsAvailable();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        this.retrieveAnnouncements(this.startingValue, this.lastValue);

        return
      }
    )
  }


  public check(): boolean {
    return this.loading ? true : false;
  }

  public retrieveAnnouncements(startingValue: number, lastValue: number): void {
    let params = {
      startingValue: startingValue,
      lastValue: lastValue,
      ecommerceSiteId: this.shopID
    };
    this.api.announcementListing(params, this.auth.getToken()).subscribe(data => {
      if (data.status) {
        var exceljsonobj = [];
        for (var v in data.data) {
          var courses = "";
          data.data[v].courseArray.forEach(element => {
            courses += element.courseName + ", ";
          });
          exceljsonobj.push({
            "date": data.data[v]._id,
            "announcement": data.data[v].announcement,
            "title": data.data[v].title,
            "courses": courses
          });
        }
        this.receivedData = exceljsonobj;
        console.log("retrieve Announcements data: ", this.receivedData)
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

  OnCompose_Click() {
    this.router.navigate(['/ecommerce/compose-announcement'], { queryParams: { shopId: this.shopID } });
  }

  onPaginaion_Clicked(data) {
    if (data.target.textContent == "Next >>" && this.maxNextClick > -1) {
      this.startingValue = this.lastValue;
      this.lastValue += 10;
      this.loading = true;
      this.opacity = "opacity";
      this.retrieveAnnouncements(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if (data.target.textContent == "<< Previous" && this.isPreviousDisabled == "") {
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading = true;
      this.opacity = "opacity";
      this.retrieveAnnouncements(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }



}
