import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funnel-list',
  templateUrl: './funnel-list.component.html',
  styleUrls: ['./funnel-list.component.css']
})
export class FunnelListComponent implements OnInit {

  public loading: boolean = false;
  public funnels: Array<any> = [];
  public funnelName: string;
  name: string;
  @ViewChild('closeFunnelCreateModal',{static: false}) funnelCreateModal: ElementRef;
  @ViewChild('updateFunnel',{static: false}) funnelUpdateModal: any;

  editFunnel: any = {};

  constructor(public auth: AuthserviceService, private toastr: ToastrService, public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.getProfile();
    this.getFunnelList();
  }

  getProfile() {
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
  public getFunnelList(): void {
    let params = {
      "startingValue": 0,
      "lastValue": 1000
    };

    this.api.funnelList(params, this.auth.getToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.funnels = data.data.data
          return
        }
        return
      },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  createFunnel(event) {

    if (!this.funnelName)
      this.toastr.warning("Please enter funnel name.");
    else {
      this.loading = true;
      let params = {
        "funnelName": this.funnelName
      };
      this.api.createFunnel(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (data.status) {
            this.funnelName = "";
            this.toastr.success(data.msg);
            this.funnelCreateModal.nativeElement.click();
            this.getFunnelList();
            return
          }
          this.toastr.warning(data.msg);

          return
        },
        err => {
          this.loading = false;
          this.toastr.warning(err.msg);
          console.log(err)
          return
        }
      )
    }
  }



  upodateFunnel(funnelItem: any) {

    if (!funnelItem.funnel_name)
      this.toastr.warning("Please enter funnel name.");
    else {
      this.loading = true;
      let params = {
        "newfunnel_name": funnelItem.funnel_name,
        "funnel_id": funnelItem._id
      };
      this.api.updateFunnel(params, this.auth.getToken()).subscribe(
        data => {
          this.loading = false;
          if (data.status) {
            // this.editFunnel.funnel_name = "";
            this.toastr.success(data.msg);
            this.funnelUpdateModal.hide();
            this.getFunnelList();
            return
          }
          return
        },
        err => {
          this.loading = false;
          console.log(err)
          this.toastr.warning(err.msg);
          return
        }
      )
    }
  }

  editFunnelModal(funnel: any) {
    this.editFunnel = funnel;
    this.funnelUpdateModal.show();
  }


  onDeleteContact(item, index) {
    if (confirm("Are you sure to delete " + item.funnel_name)) {
      this.loading = true;
      var params = { "funnel_id": item._id };
      this.api.deleteFunnel(params, this.auth.getToken()).subscribe(data => {
        this.loading = false;
        if (data.status) {
          this.funnels.splice(index, 1);
        }
        return;
      },
        err => {
          this.loading = false;
          console.log(err);
          return;
        }
      )
    }
  }


  openSteps(item: any) {
    localStorage.setItem("funnel_name",item.funnel_name);
    this.router.navigate(['/funnel-optin-multiple-templates/steps'],
      { queryParams: { funnelId: item._id, name: item.funnel_name } });
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
