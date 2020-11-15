import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddressModalComponent } from '../address-modal/address-modal.component';

@Component({
  selector: 'app-ecom-dash-edit-address',
  templateUrl: './ecom-dash-edit-address.component.html',
  styleUrls: ['./ecom-dash-edit-address.component.css']
})
export class EcomDashEditAddressComponent implements OnInit {

  public loading: boolean = false;
  public addressList: any = [];
  public ecommerceSiteId: string;
  public createdById: string;
  public headerData: any;

  constructor(
    public matDialog: MatDialog,
    private auth: AuthserviceService,
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.getAddressList()
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/ecom-dash-dashboard']);
        }
        this.ecommerceSiteId = data.id
        this.createdById = data.createdById
        return
      }
    )
  }

  public getAddressList(): void {
    var params = {
      "startingValue": 0,
      "lastValue": 100
    }
    this.api.getSavedAddressList(params, this.auth.getEcommercerUserToken()).subscribe(data => {
        this.loading = false;
        console.log("address data:", data);
        if (data.status) {
          this.addressList = data.data;
          return
        }
        else
          this.toast.warning("");
        return
      },
      err => {
        this.loading = false;
        this.toast.warning("");
        console.log(err)
        return
      })
  }

  deleteAddress(addressId: string, index: number) {
    if (confirm("Are you sure you want to delete this address?")) {
      var params = { "deliveryAddressId": addressId }
      this.api.deleteAddress(params, this.auth.getEcommercerUserToken()).subscribe(
        data => {
          this.loading = false;
          if (data.status) {
            this.addressList.splice(index, 1)
            this.toast.success(data.msg);
            return
          }
          this.toast.warning(data.msg);
          return
        },
        err => {
          this.loading = false;
          this.toast.warning("");
          console.log(err)
          return
        })
    }
  }

  addAddress() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;

    const modalDialog = this.matDialog.open(AddressModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(data => {
      console.log(data);
        this.addressList.push(data.data);
    })
    console.log(modalDialog);
  }

  editAddress(address: any) {
    console.log(address);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = address;

    const modalDialog = this.matDialog.open(AddressModalComponent, dialogConfig);
    console.log(modalDialog);
  }

}
