import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  name: string;
  public loading: boolean = false;
  public token: string;
  public pagesData: Array<any> = []
  public params: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.loading = true;
    this.retrivePageList();
    this.getProfile(this.auth.getToken());
  }

  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }

  public retrivePageList(): void {
    this.token = this.auth.getToken()
    this.params = {
      "startingValue": 0,
      "lastValue": 500,
      "blogSiteId": localStorage.getItem("blogId")
    }

    this.api.pageSiteList(this.params, this.token).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.pagesData = data.data
          return
        }
        return
      },
      err => {
        console.log(err)
        this.loading = false;
        return
      }
    )
  }
  public addNewPage(): void {
    this.router.navigate(['/add-page'])
  }


  onEdit(_id: string) {
    this.router.navigate(['/add-page'], { queryParams: { pageId: _id } })
  }

  onDelete(page, index) {
    if (confirm("Are you sure to delete this page?")) {
      this.loading = true;

      var params = {
        "blogPageId": page._id
      }
      this.api.deletePageSite(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.pagesData.splice(index, 1);
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
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
}
