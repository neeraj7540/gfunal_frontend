import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cb-template-buy-now',
  templateUrl: './cb-template-buy-now.component.html',
  styleUrls: ['./cb-template-buy-now.component.css']
})
export class CbTemplateBuyNowComponent implements OnInit {
  public loading: boolean = false;
  public receivedData: Array<any> = []
  public userInfo: any = {};
  public acadmyInfo: any = {};

  public isLoggedIn: boolean = false;
  private templateID: string;
  private acadmyID: string;

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.isLoggedIn = this.auth.isStudentLoggedIn();
    console.log(this.isLoggedIn)
    this.checkQueryIsAvailable()

  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          // return this.router.navigate(['/cb-template-buy-now']);
        }
        this.templateID = data.id
        this.acadmyID = data.academy
        this.auth.currentStudentAcadmy(this.acadmyID);
        this.retriveCourseList();
        return
      }
    )
  }

  public retriveCourseList(): void {
    var params = {
      "templateCreaterId": this.templateID,
      "academyId": this.acadmyID

      // "templateCreaterId": "5e15626c1fc9cb109ea91ee1"
    }
    this.api.fetchCoursesList(params, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        this.userInfo = data.userInformation;
        this.acadmyInfo = data.academyInformation;

        const imageObjStr = JSON.parse(this.acadmyInfo.logo);
        this.acadmyInfo.logo = imageObjStr.data.Location;

        if (data.status) {
          this.receivedData = data.data
          for (let i = 0; i < this.receivedData.length; i++) {
            const myObjStr = JSON.parse(this.receivedData[i].logo);
            this.receivedData[i].image = myObjStr.data.Location
          }
          return
        }
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      })
  }

  onClickCourse(coursePackage: any) {
    if (this.isLoggedIn && this.auth.getStudentAcadmy(this.acadmyID) === this.auth.getCurrentStudentAcadmy())
      this.router.navigate(["/cb-template-choose-package"], { queryParams: { id: this.templateID, courseName: coursePackage.courseName, packageId: coursePackage._id, academy: this.acadmyID } })
    else {
      this.router.navigate(["/ecom-dash-login"], { queryParams: { id: this.templateID, academy: this.acadmyID } })
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
