import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';

@Component({
  selector: 'app-ecom-dash-signup',
  templateUrl: './ecom-dash-signup.component.html',
  styleUrls: ['./ecom-dash-signup.component.css']
})
export class EcomDashSignupComponent implements OnInit {

  loading: boolean = false;
  opacity: string = "";
  signupRequest: any = {}
  private templateID: string;
  private acadmyID: string;

  constructor(private toastr: ToastrService, public router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthserviceService, private api: ApiServiceService) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
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
    else {
      this.signupRequest.templateId = "5d88fd931d005e0dcfc19ed6"
      this.signupRequest.templateCreaterId = this.templateID
      this.signupRequest.templateCreaterEmail = "rajat.coursebuilder@yopmail.com"
      this.signupRequest.academyId = this.acadmyID

      this.loading = true;
      this.opacity = "opacity";
      this.api.signup(this.signupRequest).subscribe(res => {
        this.loading = false;
        this.opacity = "";
        console.log(res)
        if (res.status) {
          this.toastr.success(res.msg)
          setTimeout(() => {
            this.router.navigate(['/student-confirmation'], {
              queryParams: {
                email: this.signupRequest.email.toLowerCase(),
                id: this.templateID,
                academy: this.acadmyID
              }
            })
          }, 1000);
          return
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
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  openLoginPage() {
    this.router.navigate(['/ecom-dash-login'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }
}
