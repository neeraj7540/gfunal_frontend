import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  public params: any;
  public dashboardDataItems: Array<any>;
  public blogId;
  name:string;

  constructor(
    private api: ApiService,
    private auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dashboardData();
    this.checkQueryIsAvailable();
    this.getProfile(this.auth.getToken());
  }
  getProfile(token:string){
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data=>{
        console.log("data is ", data)
        this.name=data["data"]["first_name"]+" " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err=>{
        console.log("err is", err)
      }
    )
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.blogCategory) {
          // return this.router.navigate(['/dashboard'])
        }
        return
      }
    )
  }

  public dashboardData(): void {
    this.api.blogDashboardData(this.params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.dashboardDataItems = data.data
          return
        },
        err => {
          this.toastr.error(err.error.msg)
        }
      )
  }

}
