import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-b-footer',
  templateUrl: './b-footer.component.html',
  styleUrls: ['./b-footer.component.css']
})
export class BFooterComponent implements OnInit {

  public columnSelected: number = 1;
  public columnFirst: any = { type: "image" };

  public col1: any = { widgetTitle: "", data: [{ type: "image", id: 1 }] };
  public col2: any = { widgetTitle: "", data: [{ type: "image", id: 1 }] };
  public col3: any = { widgetTitle: "", data: [{ type: "image", id: 1 }] };
  public col4: any = { widgetTitle: "", data: [{ type: "image", id: 1 }] };

  public loading: boolean = false;
  public isFooterDataExists: boolean = false;
  public name: string;

  public blogFooterId: string = "";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getFooterData();
  }

  public readURLFirst(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.col1.data[index].image = reader.result;
        console.log(this.col1.data[index].image);
      };
      reader.readAsDataURL(file);
    }
  }
  public readURLSecond(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.col2.data[index].image = reader.result;
        console.log(this.col2.data[index].image);
      };
      reader.readAsDataURL(file);
    }
  }

  public readURLThird(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.col3.data[index].image = reader.result;
        console.log(this.col3.data[index].image);
      };
      reader.readAsDataURL(file);
    }
  }

  public readURLFourth(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.col4.data[index].image = reader.result;
        console.log(this.col4.data[index].image);
      };
      reader.readAsDataURL(file);
    }
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

  getFooterData() {

    this.loading = true;
    let params = {
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.getBlogFooter(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
        this.columnSelected = data.data.colActivated;
        this.blogFooterId = data.data._id;
        this.col1 = data.data.col1;
        this.col2 = data.data.col2;
        this.col3 = data.data.col3;
        this.col4 = data.data.col4;
        this.isFooterDataExists = true;
        this.toastr.success(data.msg);
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
  }

  addMoreFirstColumn() {
    var id = this.col1.data.length + 1;
    this.col1.data.push({ type: "image", id: id });
  }
  addMoreSecondColumn() {
    var id = this.col2.data.length + 1;
    this.col2.data.push({ type: "image", id: id });
  }

  addMoreThirdColumn() {
    var id = this.col3.data.length + 1;
    this.col3.data.push({ type: "image", id: id });
  }
  addMoreFourthColumn() {
    var id = this.col4.data.length + 1;
    this.col4.data.push({ type: "image", id: id });
  }

  save() {
    let apiName = "blogSiteFooter";
    if (this.isFooterDataExists) {
      apiName = "blogSiteFooterUpdate";
    }

    let params = {
      blogSiteId: localStorage.getItem("blogId"),
      colActivated: this.columnSelected,
      blogFooterId: this.blogFooterId,
      col1: this.col1,
      col2: this.col2,
      col3: this.col3,
      col4: this.col4
    }
    console.log(params);

    this.loading = true;

    this.api.saveUpdateBlogFooter(params, this.auth.getToken(), apiName).subscribe(
      data => {
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg)
          return
        }
        this.toastr.success(data.msg);
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
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
