import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: Array<any> = [];

  public loading: boolean = false;
  public categoryParams: any;
  public categoryName: string;
  public categoryID: string;
  public isEdit: boolean = false;
  public name: string;
  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.loading = true;
    this.getProfile();
    this.getCategories();
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
  public getCategories(): void {
    var params = {
      "startingValue": 0,
      "lastValue": 10,
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.blogCategoryList(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.categories = data.data
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.msg)
        }
      )
  }

  addCategory() {

    if (!this.categoryName) {
      this.toastr.warning("Please enter category name.");
    } else {
      this.loading = true;
      var params = {
        "value": this.categoryName,
        "key": this.categoryName,
        "blogSiteId": localStorage.getItem("blogId")
      }
      this.api.addBlogCategory(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg)
              return;
            }
            this.categoryName = ""
            this.getCategories();
            // this.pages = data.data
            return
          },
          err => {
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  updateCategory() {
    if (!this.categoryName) {
      this.toastr.warning("Please enter category name.");
    } else {
      var params = {
        "value": this.categoryName,
        "key": this.categoryName,
        "blogSiteId": localStorage.getItem("blogId"),
        "categoryId": this.categoryID
      }
      this.api.updateBlogCategory(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return;
            }
            this.toastr.success(data.msg);
            this.isEdit = false;
            this.categoryName = ""
            this.getCategories();
            return
          },
          err => {
            this.toastr.error(err.error.msg)
          }
        )
    }
  }


  onDelete(category, index) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.loading = true;

      var params = {
        "categoryId": category._id
      }
      this.api.deleteBlogCategory(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.categories.splice(index, 1);
            return
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  onEdit(category: any) {
    this.categoryName = category.key;
    this.categoryID = category._id;
    this.isEdit = true;
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
