import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-template1',
  templateUrl: './blog-template1.component.html',
  styleUrls: ['./blog-template1.component.css']
})
export class BlogTemplate1Component implements OnInit {


  id: string;
  public token: string;
  public blogs: Array<any> = []
  public blogHeader: any = {};

  constructor(
    private router: Router,
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private auth: AuthserviceService

  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.retriveHeader();
    this.retrivePageList();
  }


  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (data.blogId) {
          this.id = data.blogId;
          return
        }
        return
      }
    )
  }

  public retriveHeader(): void {
    var params = {
      "blogSiteId": this.id
    }
    this.api.getBlogHeaderData(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          if (!data.status) {
            return
          }
          this.blogHeader = data.data;
          return
        },
        err => {
          console.log(err)
          return
        }
      )
  }

  public retrivePageList(): void {
    this.token = this.auth.getToken()
    var params = {
      "startingValue": 0,
      "lastValue": 5,
      "blogSiteId": this.id
    }
    this.api.getMyBlogsSite(params, this.token).subscribe(
      data => {
        if (data.status) {
          this.blogs = data.data
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

}
