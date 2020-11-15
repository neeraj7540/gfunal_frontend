import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/ecommerceModule/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  public landdingPageID: string;
  public callingPage: string;
  public data: any;
  public token: string;
  opacity: string = "";
  public loading: boolean = false;
  public customer: any = {};
  name: string = this.auth.getUserName();

  constructor(private toastr: ToastrService,
    public api: ApiService,
    private auth: AuthserviceService,
    private router: Router,
    private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    // this.checkValue();
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {
        this.landdingPageID = value.landdingPageID
        this.callingPage = value.callingPage

        if (!this.landdingPageID)
          this.router.navigate(['/lp-lists']);
      }
    )
  }

  public check(): boolean {
    if (this.loading)
      return true
    else
      return false
  }


  onSaveCustomer() {
    if (!this.customer.email)
      this.toastr.warning("Please enter email.")
    else if (!this.customer.firstname)
      this.toastr.warning("Please enter firstname.")
    else if (!this.customer.lastname)
      this.toastr.warning("Please enter lastname.")
    else if (!this.customer.phonenumber)
      this.toastr.warning("Please enter phone number.")
    else if (!this.customer.address1)
      this.toastr.warning("Please enter address.")
    else if (!this.customer.address2)
      this.toastr.warning("Please enter address 2.")
    else if (!this.customer.country)
      this.toastr.warning("Please enter country.")
    else if (!this.customer.state)
      this.toastr.warning("Please enter state.")
    else if (!this.customer.postalcode)
      this.toastr.warning("Please enter postal code.")
    else {
      this.loading = true;
      this.token = this.auth.getToken()
      this.api.createCustomer(this.customer, this.token).subscribe(data => {
        this.loading = false;
        if (!data.status) {
          this.toastr.warning(data.msg);
          return
        }
      }, err => {
        console.log(err)
        this.loading = false;
        this.opacity = "";
        this.toastr.warning(err.error.msg)
      })


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
