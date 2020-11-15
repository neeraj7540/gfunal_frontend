import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  opacity:string = "";
  public loading: boolean=false;
  public token:string;
  public receivedData: Array<any> = [];
  public paggingArray: Array<any> = [];
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
    this.retrievelistingContacts(this.startingValue, this.lastValue);
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

  private retrievelistingContacts(startingValue : number,lastValue : number ) : void{
    this.token = this.auth.getToken();
    this.api.listingContacts({"template_id" : this.landdingPageID,"startingValue": startingValue,"lastValue" : lastValue}, this.token).subscribe(data=>{
        if(data.status){
          var exceljsonobj = [];
          for (var v in data.data)
          {
            exceljsonobj.push({
              "id": data.data[v]._id,
              "firstname" : data.data[v].firstName,
              "lastname" : data.data[v].lastName,
              "useremail" : data.data[v].userEmail,
              "phonenumber" : JSON.parse(data.data[v].data).phonenumber,
              "country" : JSON.parse(data.data[v].data).country,
              "state" : JSON.parse(data.data[v].data).state,
              "postalcode" : JSON.parse(data.data[v].data).postalcode
            });
          }
          this.receivedData = exceljsonobj;
          this.isDivVisible = this.receivedData.length > 0 ? true : false;
          if(this.flag){
            this.flag = false;
            this.maxNextClick = Math.floor(data.count / 10);
            this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
          }
        }
        this.loading=false;
        this.opacity="";
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

  onDelete_Clicked(data){
    if(confirm("Are you sure to delete " + data.useremail)) {
      this.loading=true;
      this.opacity="opacity";
      this.api.deleteContact({"contactUserId": data.id}, this.token).subscribe(data=>{
        this.loading=false;
            this.opacity="";
          if(data.status){
            alert("Contact deleted successfully.");
            this.retrievelistingContacts(this.startingValue, this.lastValue);
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

  goCreateContact(){
    this.router.navigate(['/create-contact'],{ queryParams: { landdingPageID: this.landdingPageID, callingPage : "Contacts" } });
  }

  goImportContact(){
    this.router.navigate(['/landingimportcontacts'],{ queryParams: { landdingPageID: this.landdingPageID } });
  }

  public check():boolean{
    if(this.loading){
      return true
    }
    else {
      return false
    }
  }

  onPaginaion_Clicked(data){
    if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
      this.startingValue = this.lastValue;
      this.lastValue += 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrievelistingContacts(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrievelistingContacts(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }
}
