import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-student-dashboard-header',
  templateUrl: './student-dashboard-header.component.html',
  styleUrls: ['./student-dashboard-header.component.css']
})
export class StudentDashboardHeaderComponent implements OnInit {

  private templateID: string;
  private acadmyID: string;
  public studentProfile: any = {}
  public loading: boolean = false;
  public changePasswordParams: any = {};
  @ViewChild('changePasswordModal', { static: false }) changePasswordModal: any;


  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiServiceService,
    private toastr: ToastrService,
    private router: Router) {

    this.studentProfile = this.auth.getStudentProfile()

  }

  ngOnInit() {
    this.checkQueryIsAvailable()
  }


  getProfile(){
    this.studentProfile = this.auth.getStudentProfile()
  }
  
  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.templateID = data.id
        this.acadmyID = data.academy
        return
      }
    )
  }


  logout() {
    this.auth.studentLogout(this.templateID, this.acadmyID)
  }

  buyCourse() {
    this.router.navigate(['/cb-template-buy-now'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }
  openAnnouncements() {
    this.router.navigate(['/student-announcements'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }

  changePassword() {
    if (!this.changePasswordParams.oldPassword)
      this.toastr.warning("Please enter old password");
    else if (!this.changePasswordParams.newPassword)
      this.toastr.warning("Please enter new password");
    else if (!this.changePasswordParams.confirmPassword)
      this.toastr.warning("Please enter confirm password");
    else if (this.changePasswordParams.newPassword !== this.changePasswordParams.confirmPassword)
      this.toastr.warning("Confirm password does not match");
    else {
      this.loading = true;
      const formData = new FormData();
      formData.append('oldPassword', this.changePasswordParams.oldPassword);
      formData.append('newPassword', this.changePasswordParams.newPassword);
      this.api.updateProfile(formData, this.auth.getStudentToken()).subscribe(
        data => {
          this.loading = false;
          if (data.status) {
            this.toastr.success(data.msg)
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
