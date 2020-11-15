import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
@Component({
  selector: 'app-choose-blog-template',
  templateUrl: './choose-blog-template.component.html',
  styleUrls: ['./choose-blog-template.component.css']
})
export class ChooseBlogTemplateComponent implements OnInit {
  name:string;

  constructor(
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

}
