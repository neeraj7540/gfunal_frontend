import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';

@Component({
  selector: 'app-ecom-dash-login',
  templateUrl: './ecom-dash-login.component.html',
  styleUrls: ['./ecom-dash-login.component.css']
})
export class EcomDashLoginComponent implements OnInit {

  loading: boolean = false;
  opacity: string = "";
  loginRequest: any = {}
  private templateID: string;
  private acadmyID: string;

  constructor(private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    public router: Router, private auth: AuthserviceService,
    private api: ApiServiceService) { }

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

  public login() {
    if (!this.loginRequest.email)
      this.toastr.warning("Please enter email id")
    else if (!this.loginRequest.password)
      this.toastr.warning("Please enter password")
    else {
      this.loginRequest.academyId = this.acadmyID;
      this.loading = true;
      this.opacity = "opacity";
      this.api.signIn({email: this.loginRequest.email.toLowerCase(),
        password: this.loginRequest.password,templateCreaterId: this.templateID,academyId: this.acadmyID}).subscribe(res => {
        this.loading = false;
        this.opacity = "";
        console.log("Customer Token is: ",res.token)
        if (res.status) {
          this.auth.saveStudentToken(res.token)
          this.getProfile(res.token)
          return
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

  getProfile(token: string) {
    this.loading = true;
    this.opacity = "opacity";
    this.api.getStudentProfile({}, token).subscribe(res => {
      this.loading = false;
      this.opacity = "";
      console.log(res)
      if (res.status) {
        this.auth.studentLoggedIn("true");
        this.auth.saveStudentAcadmy(this.acadmyID);

        if (res.data.image != null) {
          if (res.data.image && typeof res.data.image === "object")
            res.data.userImage = res.data.image.Location;
          else
            res.data.userImage = res.data.image;
        } else 
          res.data.userImage = "https://www.w3schools.com/w3css/img_avatar2.png";
        
        this.auth.saveStudentProfile(res.data)
        this.router.navigate(["/student-dashboard"], { queryParams: { id: this.templateID, academy: this.acadmyID } })
        return
      }
      else 
        return this.toastr.warning(res.msg)
    }, err => {
      this.loading = false;
      this.opacity = "";
      this.toastr.warning(err.error.msg)
    })
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }
  openSignupPage() {
    this.router.navigate(['/ecom-dash-signup'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }

}
