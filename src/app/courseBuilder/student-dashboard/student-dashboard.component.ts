import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { StudentCourseDataService } from '../student-course-data.service';
import { ToastrService } from 'ngx-toastr';
import { PushMessagingService } from 'src/app/push-messaging.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  public loading: boolean = false;
  public templateCreaterID: String;
  public display: string;
  public receivedData: Array<any> = []
  private acadmyID: string;
  public studentProfile: any = {}
  public studentEditProfile: any = {}
  private userSelectedImage: any;
  message;
  public selectedFilePath: string = "Choose File";

  @ViewChild('profileEditModal', { static: false }) profileEditModal: any;

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private activeRoute: ActivatedRoute,
    private studentData: StudentCourseDataService,
    private toastr: ToastrService,
    private router: Router,
    private pushMessagingService: PushMessagingService) {

    this.studentProfile = this.auth.getStudentProfile()
    this.studentEditProfile = this.auth.getStudentProfile()
  }

  ngOnInit() {

    this.pushMessagingService.requestPermission().subscribe(
      (token) => {
        console.log(token);
        this.studentData.saveFCMToken(token);
        this.sendTokenToServer(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    )

    this.pushMessagingService.receiveMessage()
    this.message = this.pushMessagingService.currentMessage

    this.checkQueryIsAvailable();
  }
  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.templateCreaterID = data.id;
        this.acadmyID = data.academy
        this.retriveCoursesList();
        return
      }
    )
  }

  public retriveCoursesList(): void {
    this.loading = true;
    var params = {
      "academyId": this.acadmyID
    }
    this.api.fetchUserEnrolledCourse(params, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status && data.data.length > 0) {
          this.receivedData = data.data[0].courseInformation;

          for (var i = 0; i < this.receivedData.length; i++) {
            var obj = JSON.parse(this.receivedData[i].logo)
            this.receivedData[i].image = obj.data.Location;
          }

          console.log(this.receivedData);
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

  onClickCourse(course: any) {
    this.studentData.saveSelectedCourseData(course);
    this.router.navigate(["/course-view"], { queryParams: { id: this.templateCreaterID, course: course._id, academy: this.acadmyID, createrId: course.createdById } })
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  sendTokenToServer(token: string) {
    var params = {
      "academyId": this.acadmyID,
      "deviceToken": token,
      "platform": "platform_web"
    }

    this.api.sendFCMToken(params, this.auth.getStudentToken()).subscribe(
      data => {
        if (data.status) {
        }
        return
      },
      err => {
        console.log(err)
        return
      })
  }

  public readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFilePath = event.target.files[0].name;
  
      const file = event.target.files[0];
      this.userSelectedImage = file;
      const reader = new FileReader();
      reader.onload = e => {
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    this.loading = true;
    const formData = new FormData();
    formData.append('studentImage', this.userSelectedImage);
    formData.append('firstName', this.studentEditProfile.firstName);
    formData.append('lastName', this.studentEditProfile.lastName);


    this.api.updateProfile(formData, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.toastr.success(data.msg)
          if (data.data.image != null) {
            if (data.data.image && typeof data.data.image === "object")
              data.data.userImage = data.data.image.Location;
            else
              data.data.userImage = data.data.image;
          }
          else {
            data.data.userImage = "https://www.w3schools.com/w3css/img_avatar2.png";
          }

          this.auth.saveStudentProfile(data.data)
          this.studentProfile = data.data;
          this.profileEditModal.hide();

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
}
