import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import Axios from 'axios'
import { ToastrService, Toast } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service'
import { ApiService } from '../api.service'
import { Login } from '../login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  home: string = "home";
  loading: boolean = false;
  opacity: string = "";
  routes: Route[] = [{
    path: 'signup',
    component: SignupComponent
  }]

  async hitlogin(username, password) {

    if (!username) {
      return this.toastr.warning("Please enter your email.")
      this.loading = false;
      this.opacity = null
    }
    if (!password) {
      return this.toastr.warning("Please enter your password.")
      this.loading = false;
      this.opacity = null
    }
    let params = {
      email: username,
      password: password
    }
    try {
      const data = await Axios.post('https://gfunlbackend.herokuapp.com/users/signin', params, {})
      if (data) {
        console.log(data)
        this.loading = false;
        this.opacity = null
        this.auth.sendToken(data['token'])
        this.router.navigate(['/packages'])
      }
    }
    catch (err) {
      this.loading = false;
      this.opacity = null
      return this.toastr.error(err.response.data.msg)
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
  public username: string;
  public password: string;
  
  public login() {
    this.loading = true;
    this.opacity = "opacity";
    try {
      this.api.sigin({
        email: this.username.toLowerCase(),
        password: this.password
      }).subscribe(res => {
        this.loading = false;
        this.opacity = "";
        console.log(res)
        if (res["status"]) {
          this.auth.sendToken(res['token'])
          this.auth.checkPackage(res['package_bought'])
          this.router.navigate(['/packages'])
          return
        }
        if (res['type'] == 'confirmation') {
          this.router.navigate(['/signup-confirmation'], {
            queryParams: {
              email: this.username.toLowerCase()
            }
          })
          return
        }
        else {
          return this.toastr.warning(res["msg"])
        }
      },
        err => {
          this.loading = false;
          this.opacity = "";
          try {
            this.toastr.warning(err['error']['msg'])
          }
          catch (err) {
            this.toastr.warning('Something went wrong')
          }
        }
      )
    }
    catch (err) {
      this.toastr.warning('Please type your email and password.')
      this.loading = false;
      this.opacity = "";
    }
    // this.hitlogin(this.username.toLowerCase(), this.password)
  }

  public openForgotPassword(): void {
    this.router.navigate(['/forgot-password'])
  }



  constructor(private toastr: ToastrService, public router: Router, private auth: AuthserviceService, private api: ApiService) { }

  ngOnInit() {
  }


}
