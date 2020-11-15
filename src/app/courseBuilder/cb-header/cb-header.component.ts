import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cb-header',
  templateUrl: './cb-header.component.html',
  styleUrls: ['./cb-header.component.css']
})
export class CbHeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  private templateID: string;
  private acadmyID: string;


  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isStudentLoggedIn();
    this.checkQueryIsAvailable()
  }

  isUserLoggedInAcadmy() {
    return this.isLoggedIn && this.auth.getStudentAcadmy(this.acadmyID) === this.auth.getCurrentStudentAcadmy()
  }
  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        this.templateID = data.id
        this.acadmyID = data.academy
        return
      }
    )
  }

  openDashboard() {
    this.router.navigate(['/student-dashboard'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }

  openLoginPage() {
    this.router.navigate(['/ecom-dash-login'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }

  openSignupPage() {
    this.router.navigate(['/ecom-dash-signup'], { queryParams: { id: this.templateID, academy: this.acadmyID } })
  }
}
