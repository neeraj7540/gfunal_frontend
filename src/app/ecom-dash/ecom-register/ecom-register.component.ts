import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ecom-register',
  templateUrl: './ecom-register.component.html',
  styleUrls: ['./ecom-register.component.css']
})
export class EcomRegisterComponent implements OnInit {


  loading: boolean = false;
  opacity: string = "";
  signupRequest: any = {}
  private ecommerceSiteID: string;
  private createrID: string;

  constructor(private toastr: ToastrService, public router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthserviceService,
    private api: ApiService) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/ecom-dash-dashboard']);
        }
        this.ecommerceSiteID = data.id;
        this.createrID = data.createdById;
        return
      }
    )
  }

  public signup() {
    if (!this.signupRequest.firstName)
      this.toastr.warning("Please enter first name")
    else if (!this.signupRequest.lastName)
      this.toastr.warning("Please enter last name")
    else if (!this.signupRequest.email)
      this.toastr.warning("Please enter email id")
    else if (!this.signupRequest.password)
      this.toastr.warning("Please enter password")
    else if (!this.signupRequest.confirmPassword)
      this.toastr.warning("Please enter confirm password")
    else if (this.signupRequest.password !== this.signupRequest.confirmPassword)
      this.toastr.warning("Passwords Don't Match.")
    else {
      // this.signupRequest.templateId = "5d88fd931d005e0dcfc19ed6"
      this.signupRequest.ecommerceSiteId = this.ecommerceSiteID;
      this.signupRequest.name = this.signupRequest.firstName + " " + this.signupRequest.lastName;

      this.loading = true;
      this.opacity = "opacity";
      this.api.register(this.signupRequest).subscribe(res => {
        this.loading = false;
        this.opacity = "";
        if (res.status) {
          this.toastr.success(res.msg);
          this.auth.saveEcommercerUserToken(res.data);
          this.auth.ecommerceUserLoggedIn("true");
          this.router.navigate(["/ecom-dash-dashboard"], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
          return;
        }
        else {
          this.toastr.warning(res.msg)
        }
      }, err => {
        this.loading = false;
        this.opacity = "";
        this.toastr.warning(err.error.msg)
      })
    }
  }

  public check(): boolean {
    if (this.loading) 
      return true
    else 
      return false
  }

  openLoginPage() {
    this.router.navigate(['/ecom-login'], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
  }

}
