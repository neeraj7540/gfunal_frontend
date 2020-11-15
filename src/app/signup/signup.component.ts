import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  home: string = 'home';
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public password: string;
  public loading: boolean = false;
  public opacity: string = "";

  constructor(
    public route: Router,
    public toastr: ToastrService,
    public api: ApiService
  ) { }

  ngOnInit() {
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  // async hitSignupApi(params){

  //   try{
  //     const data = await Axios.post('http://localhost:3000/users/signup',params,{})
  //     if(data){

  //     }
  //   }
  //   catch(err){

  //     this.toastr.error(err.response.data.msg)
  //   }
  // }

  public signup() {
    if (this.validateData()) {
      try {
        this.loading = true;
        this.opacity = "opacity";
        this.api.signup(this.first_name, this.last_name, this.email.toLowerCase(), this.phone, this.password).subscribe(data => {
          this.loading = false;
          this.opacity = "";
          if (!data['status']) {
            this.toastr.warning(data['msg'])
            return
          }
          if (data['status']) {
            this.toastr.success(data['msg'])
            setTimeout(() => {
              this.route.navigate(['/signup-confirmation'], {
                queryParams: {
                  email: this.email.toLowerCase()
                }
              })
            }, 1000);
            return
          }
        },
          err => {
            console.log(err)
            this.loading = false;
            this.opacity = "";
            this.toastr.warning(err.error.msg)
          }
        )
      }
      catch (err) {
        console.log(err)
        this.loading = false;
        this.opacity = ""
        this.toastr.warning("Please fill the requirements.")
      }
    }
    return
  }

  validateData(): boolean {
    if (!this.first_name) {
      this.toastr.warning("Please enter your first name.")
      return false;
    }
    if (!this.last_name) {
      this.toastr.warning("Please enter your last name.")
      return false;
    }
    if (!this.email) {
      this.toastr.warning("Please enter email.")
      return false;
    }
    if (!this.phone) {
      this.toastr.warning("Please enter phone.")
      return false;
    }
    if (!this.password) {
      this.toastr.warning("Please enter your password.")
      return false;
    }
    return true;
  }
}
