import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';



@Component({
  selector: 'app-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.css']
})
export class SignupConfirmationComponent implements OnInit {

  public first_digit:string;
  public second_digit:string;
  public third_digit:string;
  public fourth_digit:string;
  public data: any;
  public params: any;
  public email: string;

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

  public checkValue():void{
    this.data = this.route.queryParams.subscribe(
      value=>{
        this.email = value.email
      }
    )
  }

  public validateOtp():void{
    if(!this.first_digit||!this.second_digit||!this.third_digit||!this.fourth_digit){
      this.toastr.error("Please enter four digit OTP.")
      return
    }
    this.params = {
      email:this.email,
      otp:this.first_digit+this.second_digit+this.third_digit+this.fourth_digit
    }
    this.api.otpValidation(this.params).subscribe(value=>{
      console.log("error is", value)
      if(value['status']){
        this.toastr.success(value.msg)
        this.auth.sendToken(value['token'])
        this.auth.checkPackage(value['package_bought'])
        this.router.navigate(['/packages'])
      }

    },err=>{
      this.toastr.error(err.error.msg)
      // console.log("err", err)
      if(err.status==400){
        this.toastr.warning(err.error.msg)
      }
    })
  }

  public resendOTP():void{
    this.params={
      email:this.email,
    }
    this.api.resendOTP(this.params).subscribe(
      data=> {
        if(!data.status){
          this.toastr.warning(data.msg)
          return
        }
        return this.toastr.success(data.msg)
      },
      err=>{
        return this.toastr.error(err.error.msg)
      }
    )
  }


}
