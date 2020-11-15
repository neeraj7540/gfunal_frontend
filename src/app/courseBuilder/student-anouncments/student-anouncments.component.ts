import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-anouncments',
  templateUrl: './student-anouncments.component.html',
  styleUrls: ['./student-anouncments.component.css']
})
export class StudentAnouncmentsComponent implements OnInit {

  public loading: boolean = false;
  public templateCreaterID: String;
  public receivedData: Array<any> = []
  private acadmyID: string;
  public studentProfile: any = {}
  public studentEditProfile: any = {}
  message;

  @ViewChild('profileEditModal', { static: false }) profileEditModal: any;

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {

    // this.studentProfile = this.auth.getStudentProfile()
    // this.studentEditProfile = this.auth.getStudentProfile()
  }

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.templateCreaterID = data.id;
        this.acadmyID = data.academy
        this.retriveAnouncements();
        return
      })
  }

  public retriveAnouncements(): void {
    var params = {
      "academyId": this.acadmyID,
      "templateCreaterId": this.templateCreaterID
    }
    this.api.fetchStudentAnnouncements(params, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.receivedData = data.data;
          console.log(this.receivedData);
          return
        } else {
          this.toastr.warning(data.msg)
        }
        return
      },
      err => {
        this.loading = false;
        this.toastr.warning(err.error.msg)
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
