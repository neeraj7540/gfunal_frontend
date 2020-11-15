import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthserviceService } from '../authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  public landdingPageID: string;
  public data: any;
  public token: string;
  opacity: string = "";
  public loading: boolean = false;
  public itemname: string;
  public tenure: string;
  public price: string;
  public discount: string;
  public tax: string;
  public emailInvoiceTo: string;
  public isItemTaxable: boolean = false;
  name: string = this.auth.getUserName();
  isDivVisible: boolean = false;
  public itemsArray: Array<any> = [];
  public subTotal: string;
  public addDiscount: string;
  public TotalTax: string = "0";
  public Total: number;
  public isSearchVisible: boolean = false;
  public searchInput: string;
  public searchDataArray: Array<any> = [];
  public note: string = "";
  public invoiceCustomerId: string = "";

  @ViewChild('basicModal',{static: false}) funnelUpdateModal: any;


  constructor(private toastr: ToastrService, public api: ApiService, private auth: AuthserviceService,
    private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
    this.isDivVisible = this.itemsArray.length > 0 ? true : false;
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {

        this.landdingPageID = value.landdingPageID

        console.log("Values is: ", value);

        if (!this.landdingPageID)
          this.router.navigate(['/lp-lists']);
      }
    )
  }

  SaveCustomItem() {
    if (this.validateData()) {
      this.itemsArray.push({
        "itemName": this.itemname,
        "tenure": this.tenure,
        "price": this.price,
        "discount": this.discount,
        "isTaxableItem": this.isItemTaxable,
        "tax": this.tax
      });
      this.isDivVisible = true;
      this.subTotal = this.getSubtotalPrice(this.itemsArray);
      this.addDiscount = this.getDiscount(this.itemsArray);
      if (this.isItemTaxable)
        this.TotalTax = this.getTax(this.itemsArray);

      var totalWithoutTax = parseFloat(this.subTotal) - parseFloat(this.addDiscount);
      this.Total = totalWithoutTax + parseFloat(this.TotalTax);
      this.itemname = this.tenure = this.price = this.discount = this.tax = "";
      this.isItemTaxable = false;
      this.funnelUpdateModal.hide();
    }
  }

  validateData(): boolean {
    if (!this.itemname) {
      this.toastr.warning("Please enter name.")
      return false;
    }
    else if (!this.tenure) {
      this.toastr.warning("Please enter tenure.")
      return false;
    }
    else if (!this.price) {
      this.toastr.warning("Please enter price.")
      return false;
    }
    else if (!this.discount) {
      this.toastr.warning("Please enter discount.")
      return false;
    }
    return true;
  }

  getSubtotalPrice(data): string {
    var totalArray = [];
    for (var d in data) {
      totalArray.push(data[d].price)
    }
    let dataResult = this.subtotal(totalArray);
    return dataResult.toString();
  }

  getDiscount(data): string {
    var discountArray = [];
    for (var d in data) {
      discountArray.push(data[d].discount)
    }
    let dataResult = this.subtotal(discountArray);
    return dataResult.toString();
  }

  getTax(data): string {
    var taxArray = [];
    for (var d in data) {
      if (data[d].isTaxableItem)
        taxArray.push((data[d].tax / 100) * data[d].price);
    }
    let dataResult = this.subtotal(taxArray);
    return dataResult.toString();
  }

  subtotal(input) {
    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += parseFloat(input[i]);
    }
    return total;
  }

  taxableItemChecked(e) {
    if (e.target.checked)
      this.isItemTaxable = true;
    else
      this.isItemTaxable = false;
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  onDelete_Clicked(data) {
    this.itemsArray = this.itemsArray.filter(item => item !== data);
    this.isDivVisible = this.itemsArray.length > 0 ? true : false;
    this.subTotal = this.getSubtotalPrice(this.itemsArray);
    this.addDiscount = this.getDiscount(this.itemsArray);
    this.Total = parseInt(this.subTotal) - parseInt(this.addDiscount);
    this.TotalTax = this.getTax(this.itemsArray);
  }

  public searchContacts(): void {
    this.token = this.auth.getToken()
    this.api.getSearchContacts({ "searching": this.searchInput }, this.token).subscribe(data => {
      if (data.status) {
        debugger;
        this.loading = false;
        this.opacity = "";
        this.searchDataArray = data.userDetails;

        if (this.searchDataArray.length <= 0)
          this.searchDataArray.push({ "invoiceCustomerId": "-1", "Name": "no contacts found." });

        this.isSearchVisible = true;
      }
      return;
    },
      err => {
        this.loading = false;
        this.opacity = "";
        console.log(err)
        return;
      }
    )
  }

  onContact_Selected(data) {
    if (data.Name == "Not any contact found.")
      return;

    this.invoiceCustomerId = data.invoiceCustomerId;
    this.searchInput = "";
    let x = data.Name.split(" - ");
    this.emailInvoiceTo = x[1];
    this.searchDataArray = [];
    this.isSearchVisible = false;
  }

  goCreateContact() {
    this.router.navigate(['/create-contact'], { queryParams: { landdingPageID: this.landdingPageID, callingPage: "Invoices" } });
  }

  onSaveAndEmail_Clicked() {
    if (this.validation()) {
      try {
        this.loading = true;
        this.opacity = "opacity";
        let footerData = {
          sendTo: this.emailInvoiceTo,
          Subtotal: this.subTotal,
          Discount: this.addDiscount,
          Taxes: this.TotalTax,
          Total: this.Total
        }

        let params = {
          template_id: this.landdingPageID,
          invoiceCustomerId: this.invoiceCustomerId,
          itemDetails: this.itemsArray,
          notes: this.note,
          footerEmailData: footerData,
        }
        this.token = this.auth.getToken()
        this.api.saveInvoice(params, this.token).subscribe(data => {
          this.loading = false;
          this.opacity = "";
          if (!data['status']) {
            this.toastr.warning(data['msg'])
            return
          }
          if (data['status']) {
            this.toastr.success(data['msg'])
            this.router.navigate(['/invoice-list'], { queryParams: { landdingPageID: this.landdingPageID } });
            return
          }
        },
          err => {
            console.log(err)
            this.loading = false;
            this.opacity = "";
            this.toastr.warning(err.error.msg)
          }
        )
      }
      catch (err) {
        console.log(err)
        this.loading = false;
        this.opacity = ""
        this.toastr.warning("Please fill the requirements.")
      }
      return
    }
  }

  validation(): boolean {
    if (!this.invoiceCustomerId) {
      this.toastr.warning("Please select customer.")
      return false;
    }
    if (!this.itemsArray) {
      this.toastr.warning("Please add item.")
      return false;
    }

    return true;
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