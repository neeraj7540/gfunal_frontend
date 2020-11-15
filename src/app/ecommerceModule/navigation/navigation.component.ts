import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {


  public menuName: string;
  public menuId: string;
  public loading: boolean = false;
  public menus: Array<any> = [];
  // public pages: Array<any> = [];
  // public collections: Array<any> = [];

  public selectedMenu: string;
  selectedPageCollection: any= {};
  // selectedCollection: string;

  isDivVisible: boolean = false;

  collectionsPagesData: Array<any> = [];
  name: string;
  shopID: string;

  constructor(public auth: AuthserviceService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getProfile();
    this.getMenuList();
    this.getPagesList();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        return
      }
    )
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
      "ecommerceSiteId": this.shopID,
      "startingValue": 0,
      "lastValue": 500
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

  getPagesList() {
    this.loading = true;
    var params = {
      "startingValue": 0,
      "lastValue": 50,
      "ecommerceSiteId": this.shopID
    }
    this.api.pageSiteList(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;

        if (!data.status) {
          // this.toastr.warning(data.msg)
        } else {
          // this.pages = data.data;

          let idModified = data.data.map(
            obj => {
              return {
                "_id": obj._id,
                "value": obj.pageTitle,
                "type": "page"
              }
            }
          );

          let obj = {
            label: "Pages",
            values: idModified
          }
          this.collectionsPagesData.push(obj);
        }
        console.log(this.collectionsPagesData);
        this.getCollectionsList();
        return
      },
      err => {
        this.loading = false;
        this.toastr.error(err.error.msg)
      }
    )
  }


  getCollectionsList() {
    this.loading = true;
    var params = {
      "startingValue": 0,
      "lastValue": 500,
      "ecommerceSiteId": this.shopID
    }
    this.api.getCollections(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;

        if (!data.status) {
          // this.toastr.warning(data.msg)
          return
        }

        let idModified = data.data.map(
          obj => {
            return {
              "_id": obj._id,
              "value": obj.collectionTitle,
              "type": "collection"
            }
          }
        );
        let obj = {
          label: "Collection",
          values: idModified
        }
        this.collectionsPagesData.push(obj);
        console.log(this.collectionsPagesData);
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
        "name": this.menuName,
        "ecommerceSiteId": this.shopID
      };
      this.api.saveMenu(params, this.auth.getToken()).subscribe(data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.toastr.success(data.msg);
          this.menus.push(data.data);
          this.isDivVisible = true;
          return;
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
        "newName": this.menuName,
        "addNavigationID": this.menuId,
        "ecommerceSiteId": this.shopID
      };
      this.api.updateMenu(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.menuId = "";
          this.menuName = ""
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
    console.log(this.selectedPageCollection);
    console.log(this.selectedMenu);

    if (!this.selectedMenu)
      this.toastr.warning("Please select menu first.");
    else if (!this.selectedPageCollection || this.selectedPageCollection === undefined)
      this.toastr.warning("Please select page or collection.");
    else {
      this.loading = true;
      var params = {
        "ecommerceSiteId": this.shopID,
        "name": this.selectedMenu,
        "category": this.selectedPageCollection
      };
      this.api.addNavigation(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg)
            return
          }
          this.selectedMenu = ""
          this.selectedPageCollection = undefined

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
    this.menuName = menu.name;
    this.menuId = menu._id;

    this.loading = true;
    var params = {
      "ecommerceSiteId": this.shopID,
      "addNavigationID": menu._id
    }
    this.api.previewMenu(params, this.auth.getToken()).subscribe(data => {
          console.log("data is", data)
          this.loading = false;
          if (!data.status) {
            this.toastr.warning(data.msg);
            return
          }
          this.isDivVisible = true;
          this.selectedMenu = data.data._id;
          this.selectedPageCollection = data.data.category;
          return;
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
        "addNavigationID": menu._id,
        "ecommerceSiteId": this.shopID
      }
      this.api.deleteMenu(params, this.auth.getToken()).subscribe(data => {
            this.loading = false;
            if (!data.status) {
              this.toastr.warning(data.msg);
              return;
            }
            this.toastr.success(data.msg);
            this.menus.splice(index, 1);
            this.menuName = "";this.selectedMenu = null; 
            this.selectedPageCollection = null; this.menuId = "";
            return;
          },
          err => {
            this.loading = false;
            this.toastr.error(err.error.msg)
          }
        )
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
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
