import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  opacity:string = "";
  public loading: boolean=false;
  public token:string;
  public receivedData: Array<any> = [];
  public landdingPageID: string;
  public data: any;
  name:string = this.auth.getUserName();
  isDivVisible : boolean = false;
  isPreviousDisabled : string = "disabled";
  isNextDisabled : string = "";
  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;

  constructor(private auth: AuthserviceService, private api: ApiService, private router: Router,
    private activatedRout : ActivatedRoute) { }

    ngOnInit() {
     this.checkValue();
      this.loading=true;
      this.opacity="opacity";
      this.retrievelistingInvoices(this.startingValue, this.lastValue);
    }

    public checkValue():void{
      this.data = this.activatedRout.queryParams.subscribe(
        value=>{
          this.landdingPageID = value.landdingPageID

          if(!this.landdingPageID)
            this.router.navigate(['/lp-lists']);
        }
      )
    }

    private retrievelistingInvoices(startingValue : number,lastValue : number ) : void{
      this.token = this.auth.getToken()
      this.api.listingInvoices({"template_id" : this.landdingPageID,"startingValue": startingValue,"lastValue" : lastValue}, this.token).subscribe(data=>{
          if(data.status){
            console.log("Invoice Data: ", data);
            var exceljsonobj = [];
            this.loading=false;
            this.opacity="";
            for(var v in data.data.users){
              for (var d in data.data.listingData.data)
              {
                if(data.data.listingData.data[d].invoiceCustomerId == data.data.users[v].id)
                {
                  var getSubtotal = this.subtotalPrice(data.data.listingData.data[d].itemDetails);
                  var getDiscount = this.discount(data.data.listingData.data[d].itemDetails);
                  var getTax = this.getTax(data.data.listingData.data[d].itemDetails);

                  exceljsonobj.push({
                    "id" : data.data.listingData.data[d]._id,
                    "date": data.data.listingData.data[d].updatedAt,
                    "invoice" : data.data.listingData.data[d].invoiceNumber,
                    "customerName" : data.data.users[v].firstName + " " + data.data.users[v].lastName,
                    "email" : data.data.users[v].userEmail,
                    "phone" : data.data.users[v].information.phonenumber,
                    //"address" : data.data.users[v].information.address,
                    "country" : data.data.users[v].information.country,
                    "state" : data.data.users[v].information.state,
                    "postalCode" : data.data.users[v].information.postalcode,
                    "itemsData" : data.data.listingData.data[d].itemDetails,
                    "subTotal" : getSubtotal,
                    "discount" : getDiscount,
                    "tax" : getTax,
                    "total" : (parseFloat(getSubtotal) - parseFloat(getDiscount)) + parseFloat(getTax)
                  });
                }
              }
            }

            this.receivedData = exceljsonobj;
            this.isDivVisible = this.receivedData.length > 0 ? true : false;
            if(this.flag){
              this.flag = false;
              this.maxNextClick = Math.floor(data.data.listingData.count / 10);
              this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
            }
          }
          return;
        },
        err=>{
          this.loading=false;
          this.opacity="";
          console.log(err)
          return;
        }
      )
    }

    subtotalPrice(data) : string{
      var totalArray = [];
    for(var d in data){
      totalArray.push(data[d].price)
    }
    let dataResult = this.subtotal(totalArray);
    return dataResult.toString();
    }

    discount(data) : string{
      var discountArray = [];
    for(var d in data){
      discountArray.push(data[d].discount)
    }
    let dataResult = this.subtotal(discountArray);
    return dataResult.toString();
    }

    getTax(data) : string{
      var taxArray = [];
      for(var d in data){
        if(data[d].isTaxableItem)
          taxArray.push((data[d].tax / 100) * data[d].price);
      }
      let dataResult = this.subtotal(taxArray);
      return dataResult.toString();
    }

    subtotal(input){
      var total =  0;
      for(var i=0;i<input.length;i++)
                {
                  if(isNaN(input[i])){
                  continue;
                   }
                    total += Number(input[i]);
                 }
               return total;
              }

    public check():boolean{
      if(this.loading){
        return true
      }
      else {
        return false
      }
    }

    onDelete_Clicked(deletedItem){
      if(confirm("Are you sure to delete invoice: " + deletedItem.invoice)) {
        this.loading=true;
        this.opacity="opacity";
        this.api.deleteInvoice({"invoiceId": deletedItem.id}, this.token).subscribe(data=>{
          this.loading=false;
          this.opacity="";
          if(data.status){
            alert("Invoice deleted successfully.");
            this.retrievelistingInvoices(this.startingValue, this.lastValue);
          }
            return;
          },
          err=>{
            this.loading=false;
              this.opacity="";
            console.log(err)
            return;
          }
        )
      }
    }

    GenerateNewInvoice(){
      this.router.navigate(['create-invoice'], { queryParams: { landdingPageID: this.landdingPageID } });
    }

    onPaginaion_Clicked(data){
      if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
        this.startingValue = this.lastValue;
        this.lastValue += 10;
        this.loading=true;
        this.opacity="opacity";
        this.retrievelistingInvoices(this.startingValue, this.lastValue);
        this.maxNextClick -= 1;
        this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
        this.isPreviousDisabled = "";
      }
      else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
        this.lastValue = this.startingValue;
        this.startingValue -= 10;
        this.loading=true;
        this.opacity="opacity";
        this.retrievelistingInvoices(this.startingValue, this.lastValue);
        this.maxNextClick += 1;
        this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
        this.isNextDisabled = "";
      }
    }
}
