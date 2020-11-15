import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ecom-login',
  templateUrl: './ecom-login.component.html',
  styleUrls: ['./ecom-login.component.css']
})
export class EcomLoginComponent implements OnInit {

  loading: boolean = false;
  opacity: string = "";
  loginRequest: any = {}
  private createrID: string;
  private ecommerceSiteID: string;

  constructor(private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    public router: Router,
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
        this.createrID = data.createdById;
        this.ecommerceSiteID = data.id;
        return
      }
    )
  }

  public login() {
    if (!this.loginRequest.email)
      this.toastr.warning("Please enter email id")
    else if (!this.loginRequest.password)
      this.toastr.warning("Please enter password")
    else {
      this.loginRequest.ecommerceSiteId = this.ecommerceSiteID;
      this.loading = true;
      this.opacity = "opacity";
      this.api.login(this.loginRequest).subscribe(res => {
        this.loading = false;
        this.opacity = "";
        console.log(res)
        if (res.status) {
          this.auth.saveEcommercerUserToken(res.token);
          this.auth.ecommerceUserLoggedIn("true");
          // this.getProfile(res.data)
          this.router.navigate(["/ecom-dash-dashboard"], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
          return;
        }
        else 
          return this.toastr.warning(res.msg)
      }, err => {
        this.loading = false;
        this.opacity = "";
        this.toastr.warning(err.error.msg)
      })
    }
  }

  // getProfile(token: string) {
  //   this.loading = true;
  //   this.opacity = "opacity";
  //   this.api.getStudentProfile({}, token).subscribe(res => {
  //     this.loading = false;
  //     this.opacity = "";
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
  //     this.loading = false;
  //     this.opacity = "";
  //     this.toastr.warning(err.error.msg)
  //   })
  // }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }
  openSignupPage() {
    this.router.navigate(['/ecom-register'], { queryParams: { id: this.ecommerceSiteID, createdById: this.createrID } })
  }


}
