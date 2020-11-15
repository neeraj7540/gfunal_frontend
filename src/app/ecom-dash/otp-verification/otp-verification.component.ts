import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  public first_digit: string;
  public second_digit: string;
  public third_digit: string;
  public fourth_digit: string;
  public data: any;
  public params: any;
  public email: string;
  private ecommerceSiteID: string;
  private createrID: string;

  constructor(
    public toastr: ToastrService,
    public api: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthserviceService
  ) { }

  ngOnInit() {
    console.log(this.first_digit)
    this.checkValue()
  }

  public checkValue(): void {
    this.data = this.route.queryParams.subscribe(
      value => {
        this.email = value.email
        if (!value.id) {
          return this.router.navigate(['/ecom-login']);
        }
        this.ecommerceSiteID = value.id
        this.createrID   = value.createdById
      }
    )
  }

  public validateOtp(): void {
    // if (!this.first_digit || !this.second_digit || !this.third_digit || !this.fourth_digit) {
    //   this.toastr.error("Please enter four digit OTP.")
    //   return
    // }
    // this.params = {
    //   email: this.email,
    //   otp: this.first_digit + this.second_digit + this.third_digit + this.fourth_digit,
    //   templateCreaterId: this.templateID,
    //   academyId: this.acadmyID
    // }
    // this.api.otpConfirmation(this.params).subscribe(value => {
    //   console.log("error is", value)
    //   if (value.status) {
    //     this.toastr.success(value.msg)
    //     this.auth.saveStudentToken(value.token)
    //     this.getProfile(value.token)

    //     // this.auth.checkPackage(value['package_bought'])
    //   }

    // }, err => {
    //   this.toastr.error(err.error.msg)
    //   // console.log("err", err)
    //   if (err.status == 400) {
    //     this.toastr.warning(err.error.msg)
    //   }
    // })
  }

  // getProfile(token: string) {
  //   this.api.getStudentProfile({}, token).subscribe(res => {
  //     console.log(res)
  //     if (res.status) {
  //       this.auth.studentLoggedIn("true");
  //       this.auth.saveStudentAcadmy(this.acadmyID);

  //       if (res.data.image != null) {
  //         if (res.data.image && typeof res.data.image === "object")
  //           res.data.userImage = res.data.image.Location;
  //         else
  //           res.data.userImage = res.data.image;
  //       } else {
  //         res.data.userImage = "https://www.w3schools.com/w3css/img_avatar2.png";
  //       }
  //       this.auth.saveStudentProfile(res.data)
  //       this.router.navigate(["/student-dashboard"], { queryParams: { id: this.templateID, academy: this.acadmyID } })

  //       return
  //     }
  //     else {
  //       return this.toastr.warning(res.msg)
  //     }
  //   }, err => {

  //     this.toastr.warning(err.error.msg)
  //   })
  // }

  // public resendOTP(): void {
  //   this.params = {
  //     email: this.email,
  //   }
  //   this.api.resentOTP(this.params).subscribe(
  //     data => {
  //       if (!data.status) {
  //         this.toastr.warning(data.msg)
  //         return
  //       }
  //       return this.toastr.success(data.msg)
  //     },
  //     err => {
  //       return this.toastr.error(err.error.msg)
  //     }
  //   )
  // }



}
