import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ecom-dash-add-address',
  templateUrl: './ecom-dash-add-address.component.html',
  styleUrls: ['./ecom-dash-add-address.component.css']
})
export class EcomDashAddAddressComponent implements OnInit {

  public loading: boolean = false;
  public address: any = {};

  constructor(
    private auth: AuthserviceService,
    private api: ApiService,
    private toast: ToastrService
  ) { }


  ngOnInit() {
  }

  public saveAddress(): void {
    if (!this.address.name)
      this.toast.warning("Please enter name");
    else if (!this.address.phone)
      this.toast.warning("Please enter mobile number");
    else if (!this.address.pinCode)
      this.toast.warning("Please enter pincode");
    else if (!this.address.streetAddress)
      this.toast.warning("Please enter address");
    else if (!this.address.locality)
      this.toast.warning("Please enter locality");
    else if (!this.address.city)
      this.toast.warning("Please enter city");
    else if (!this.address.state)
      this.toast.warning("Please enter state");
    else if (!this.address.addressType)
      this.toast.warning("Please select address type");
    else {
      this.address.houseNo = "houseno";
      this.address.location = "location"
      this.api.saveAddressData(this.address, this.auth.getEcommercerUserToken(),"createDeliveryAddress").subscribe(
        data => {
          this.loading = false;
          if (data.status) {
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
}
