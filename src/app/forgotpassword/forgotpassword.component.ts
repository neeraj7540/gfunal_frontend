import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  private email:string;
  private params:any;
  private otp:string;
  private password:string;
  private confirmPassword:string;
  private otpSent:Boolean=false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  public success():Boolean{
    if(this.otpSent){
      return false;
    }
    else{
      return true;
    }
  }

  public check():Boolean{
    return false
  }

  public sendEmail():void{
    this.params={
      email:this.email
    }
    this.api.forgotPassword(this.params).subscribe(
      data=>{
        console.log(data)
        if(!data.status){

          this.toastr.warning(data.msg)
          return
        }
        else{
          this.otpSent = true
          this.toastr.success(data.msg)
          return
        }
      },
      error=>{
        this.toastr.error(error.error.msg)
      }
    )
  }

  public resetpassword():void{

    this.params={
      email:this.email,
      otp: this.otp,
      newPassword: this.password
    }
    if(!this.password||!this.confirmPassword){
      this.toastr.warning("Please enter the password")
      return
    }
    if(this.password!=this.confirmPassword){
      this.toastr.warning("Your Password doesn't match.")
      return
    }

    this.api.changePassword(this.params).subscribe(
      data=>{
        if(!data.status){
          this.toastr.warning(data.msg)
          return
        }
        this.toastr.success(data.msg)
        this.router.navigate(['/login'])
        return
      },
      error=>{
        this.toastr.error(error.error.msg)
      }
    )

  }


}
