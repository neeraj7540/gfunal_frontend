import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  opacity: string = "";
  public loading: boolean = false;
  public token: string;
  public receivedData: Array<any> = []
  isDivVisible: boolean;
  public params: any;
  name: string;

  constructor(public auth: AuthserviceService, public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retriveBlogList();
    this.getProfile(this.token);
  }
  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"]
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }
  public retriveBlogList(): void {
    this.token = this.auth.getToken()
    this.params = {
      "startingValue": 0,
      "lastValue": 500
    }
    this.api.blogSiteList(this.params, this.token).subscribe(
      data => {
        if (data.status) {
          this.loading = false;
          this.opacity = "";
          this.receivedData = data.data
          return
        }
        return
      },
      err => {
        console.log(err)
        return
      }
    )
  }

  onManage_Clicked(e) {
    localStorage.setItem("blogName", e.blog_site_name);
    localStorage.setItem("blogId", e._id);
    this.router.navigate(['/blog-dashboard'], { queryParams: { blogId: e._id } });
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  onPreview(blog: any) {
    this.router.navigate(['blogtemplate1'], { queryParams: { blogId: blog._id } })
  }
  public openBlogCategory(): void {
    this.router.navigate(['blog-template-categories'])
  }

}
