import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-cb-template-choose-package',
  templateUrl: './cb-template-choose-package.component.html',
  styleUrls: ['./cb-template-choose-package.component.css']
})
export class CbTemplateChoosePackageComponent implements OnInit {

  private id: String;
  public loading: boolean = false;
  public coursePackageData: Array<any> = []

  private packageId: string = "";
  private templateCreaterId: string = "";
  private acadmyID: string;
  private courseName: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiServiceService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.packageId && !data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        if (!data.packageId && data.id) {
          return this.router.navigate(['/cb-template-buy-now'], { queryParams: { id: data.id, academy: this.acadmyID } });
        }
        this.templateCreaterId = data.id;
        this.packageId = data.packageId;
        this.acadmyID = data.academy;
        this.courseName = data.courseName;
        this.fetchPackagesofCourse();
        return
      }
    )
  }

  public fetchPackagesofCourse(): void {
    var params = {
      "templateCreaterId": this.templateCreaterId,
      "courseId": this.packageId,
      "academyId":this.acadmyID
    }
    this.api.fetchPackagesofCourse(params, this.auth.getStudentToken()).subscribe(
      data => {
        if (data.status) {
          this.loading = false;
          this.coursePackageData = data.data
          // for (let i = 0; i < this.coursePackageData.length; i++) {
          //   var packageInformation = this.coursePackageData[i].packageinformationsData;
          //   for (let j = 0; j < packageInformation.length; j++) {
          //     packageInformation[j].accessData = JSON.parse(packageInformation[j].accessData);
          //   }
          // }
          console.log(this.coursePackageData);
          return
        }
        return
      },
      err => {
        console.log(err)
        return
      })
  }

  selectedPackage(selectedPack: any) {
    console.log(selectedPack)
    var data = {
      "courseId": selectedPack.courseId,
      "packageName": selectedPack.packageName,
      "packageId": selectedPack._id,
      "totalPrice": selectedPack.packagePrice,
      "transcationId": "transcationId",
      "courseName": this.courseName
    }

    var params = {
      "courseDetails": [data],
      "academyId": this.acadmyID,
      "totalPrice": selectedPack.packagePrice,
    }

    this.api.buyACourse(params, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.toastr.success(data.msg)
          this.router.navigate(["/student-dashboard"], { queryParams: { id: this.templateCreaterId, academy: this.acadmyID } })
        } else {
          this.toastr.warning(data.msg)
        }
        return
      },
      err => {
        this.loading = false;
        this.toastr.warning(err.message)
        console.log(err)
        return
      })
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
