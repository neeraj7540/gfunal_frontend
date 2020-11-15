import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../api.service";
import { AuthserviceService } from "src/app/authservice.service";

@Component({
  selector: "app-address-modal",
  templateUrl: "./address-modal.component.html",
  styleUrls: ["./address-modal.component.css"],
})
export class AddressModalComponent implements OnInit {
  public address: any = {};
  public loading: boolean = false;
  public isDataAvailable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddressModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public previousAddressData: any,
    private toast: ToastrService,
    private auth: AuthserviceService,
    private api: ApiService
  ) {
    if (previousAddressData != null) {
      this.isDataAvailable = true;
      this.address = previousAddressData;
    }
  }

  ngOnInit() {}
  public saveAddress(isUpdateAddress: boolean): void {
    console.log(this.address);

    if (!this.address.name) this.toast.warning("Please enter name");
    else if (!this.address.phone)
      this.toast.warning("Please enter mobile number");
    else if (!this.address.pinCode) this.toast.warning("Please enter pincode");
    else if (!this.address.streetAddress)
      this.toast.warning("Please enter address");
    else if (!this.address.locality)
      this.toast.warning("Please enter locality");
    else if (!this.address.city) this.toast.warning("Please enter city");
    else if (!this.address.state) this.toast.warning("Please enter state");
    else if (!this.address.addressType)
      this.toast.warning("Please select address type");
    else {
      this.address.houseNo = "houseno";
      this.address.location = "location";
      var apiName = "createDeliveryAddress";
      if (isUpdateAddress) {
        this.address.deliveryAddressId = this.address._id;
        apiName = "updateDeliveryAddress";
      }
      this.api
        .saveAddressData(
          this.address,
          this.auth.getEcommercerUserToken(),
          apiName
        )
        .subscribe(
          (data) => {
            this.loading = false;
            if (data.status) {
              this.toast.success(data.msg);
              if (this.previousAddressData != null) {
                this.dialogRef.close({ data: null });
              } else {
                this.dialogRef.close({ data: data.data });
              }
              return;
            }
            this.toast.warning(data.msg);
            return;
          },
          (err) => {
            this.loading = false;
            this.toast.warning("");
            console.log(err);
            return;
          }
        );
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\.\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
