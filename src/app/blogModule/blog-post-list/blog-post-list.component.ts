import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {

  public postsData: Array<any> = [];
  public params: any;
  name: string;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.loading = true;
    this.getBlogPostList();
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
  public addNewPost(): void {
    this.router.navigate(['/add-post'])
  }

  public getBlogPostList(): void {
    this.params = {
      "startingValue": 0,
      "lastValue": 500,
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.blogList(this.params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;

          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.postsData = data.data
          return
        },
        err => {
          this.toastr.error(err.error.msg)
        }
      )
  }

  onEdit(_id: string) {
    this.router.navigate(['/add-post'], { queryParams: { blogId: _id } })
  }


  onDelete(post, index) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.loading = true;

      var params = {
        "blogId": post._id
      }
      this.api.deleteBlog(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.postsData.splice(index, 1);
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
