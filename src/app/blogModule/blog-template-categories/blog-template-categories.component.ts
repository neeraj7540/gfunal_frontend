import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-blog-template-categories',
  templateUrl: './blog-template-categories.component.html',
  styleUrls: ['./blog-template-categories.component.css']
})
export class BlogTemplateCategoriesComponent implements OnInit {

  name:string;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService

  ) { }

  ngOnInit() {
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
  onSelectCategory(e){
    // alert(e.target.text)
    this.router.navigate(['/choose-blogtemplate'],{
      queryParams:{
        blogCategory:e.target.text
      }
    })
  }


}
