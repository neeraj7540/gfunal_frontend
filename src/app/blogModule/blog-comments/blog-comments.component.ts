import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.css']
})
export class BlogCommentsComponent implements OnInit {

  public loading: boolean = false;
  public comments: Array<any> = []
  public name: string;

  constructor(public auth: AuthserviceService,
    public api: ApiService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.comments = [];
    this.getProfile();
    this.retriveComments();
  }

  getProfile() {
    console.log("its called")
    this.api.getProfile(this.auth.getToken()).subscribe(
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

  retriveComments() {
    let params = {
      blogSiteId: localStorage.getItem("blogId"),
      startingValue: 0,
      lastValue: 10
    }
    this.api.blogCommentsList(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.comments = data.data;
          return
        }
        this.toastr.warning(data.msg);
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }


  onDelete(comment, index) {
    if (confirm("Are you sure to delete this comment?")) {
      this.loading = true;
      var params = { "commentId": comment._id };
      this.api.deleteBlogComment(params, this.auth.getToken()).subscribe(data => {
        this.loading = false;
        if (data.status) {
          this.comments.splice(index, 1);
          this.toastr.success(data.msg);
        }
        return;
      }, err => {
        this.loading = false;
        this.toastr.warning(err.msg);
        console.log(err);
        return;
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

}
