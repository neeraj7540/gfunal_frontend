import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-menu',
  templateUrl: './blog-menu.component.html',
  styleUrls: ['./blog-menu.component.css']
})
export class BlogMenuComponent implements OnInit {

  public menuName: string;
  public menuId: string;
  public loading: boolean = false;
  public menus: Array<any> = [];
  public categories: Array<any> = [];

  public selectedMenu: string;
  selectedCat: string;
  name: string;

  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getMenuList();
    this.getCategoriesList();
    this.getProfile();
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
  getMenuList() {
    this.loading = true;
    var params = {
      "blogSiteId": localStorage.getItem("blogId"),
      "startingValue": 0,
      "lastValue": 50
    };
    this.api.menuList(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;

        if (!data.status) {
          // this.toastr.warning(data.msg)
          return
        }
        this.menus = data.data;
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.msg)
      }
    )
  }

  getCategoriesList() {
    this.loading = true;
    var params = {
      "startingValue": 0,
      "lastValue": 50,
      "blogSiteId": localStorage.getItem("blogId")
    }
    this.api.blogCategoryList(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;

        if (!data.status) {
          // this.toastr.warning(data.msg)
          return
        }
        this.categories = data.data;
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
  }

  saveMenu() {
    if (!this.menuName)
      this.toastr.warning("Please enter menu name.");
    else {
      this.loading = true;
      var params = {
        "menuName": this.menuName,
        "blogSiteId": localStorage.getItem("blogId")
      };
      this.api.saveMenu(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;

          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.menuName = "";
          this.menus.push(data.data);
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  updateMenu() {
    if (!this.menuName)
      this.toastr.warning("Please enter menu name.");
    else {
      this.loading = true;
      var params = {
        "menuName": this.menuName,
        "blogMenuId": this.menuId,
      };
      this.api.updateMenu(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.menuId = "";
          this.menuName = "";

          this.toastr.success(data.msg);
          this.getMenuList();
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }
  saveSubMenu() {
    if (!this.selectedMenu)
      this.toastr.warning("Please select menu first.");
    else if (!this.selectedCat)
      this.toastr.warning("Please select category.");
    else {
      this.loading = true;
      var params = {
        "menuCategoryId": this.selectedCat,
        "blogMenuId": this.selectedMenu
      };
      this.api.addCategoryWithMenu(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;

          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.selectedMenu = ""
          this.selectedCat = ""
          this.toastr.success(data.msg);
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
    }
  }

  onEdit(menu: any) {
    this.menuName = menu.menuName;
    this.menuId = menu._id;

    this.loading = true;
    var params = {
      "blogMenuId": menu._id
    }
    this.api.previewMenu(params, this.auth.getToken())
      .subscribe(
        data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          this.toastr.success(data.msg);
          this.selectedMenu = data.data._id;
          this.selectedCat = data.data.menuCategoryId;
          return
        },
        err => {
          this.loading = false;
          this.toastr.error(err.error.msg)
        }
      )
  }

  onDelete(menu, index) {
    if (confirm("Are you sure to delete this menu?")) {
      this.loading = true;

      var params = {
        "blogMenuId": menu._id
      }
      this.api.deleteMenu(params, this.auth.getToken())
        .subscribe(
          data => {
            console.log("data is", data)
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return
            }
            this.toastr.success(data.msg);
            this.menus.splice(index, 1);
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
