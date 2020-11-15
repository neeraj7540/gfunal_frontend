import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-template-thumb',
  templateUrl: './blog-template-thumb.component.html',
  styleUrls: ['./blog-template-thumb.component.css']
})
export class BlogTemplateThumbComponent implements OnInit {

  @Input() temp_name;

  public blogname: string;
  public params: any;
  public category: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.blogCategory) {
          return this.router.navigate(['/dashboard'])
        }
        this.category = data.blogCategory
        return
      }
    )
  }

  public previewTemplate(): void {
    alert(this.temp_name)
  }

  public createBlog(): void {


    if (!this.blogname) {
      this.toastr.warning("Please enter Blog name.");
    }
    else {

      this.params = {
        "blog_site_name": this.blogname,
        "blog_template_category": this.category,
        "blog_template_type": this.temp_name
      }

      this.api.createBlog(this.params, this.auth.getToken()).subscribe(
        data => {
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg)
          this.router.navigate(['/blog-list']);
          return
        },
        err => {
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

}
