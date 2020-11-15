import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthserviceService } from '../authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  public landdingPageID: string;
  public callingPage : string;
  public data: any;
  public token:string;
  opacity:string = "";
  public loading: boolean=false;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phonenumber: string;
  public address1: string;
  public address2: string;
  public country: string;
  public state: string;
  public postalcode: string;
  name:string = this.auth.getUserName();

  constructor(private toastr: ToastrService, public api: ApiService,private auth: AuthserviceService,
              private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
  }

  public checkValue():void{
    this.data = this.activatedRout.queryParams.subscribe(
      value=>{
        this.landdingPageID = value.landdingPageID
        this.callingPage = value.callingPage

        if(!this.landdingPageID)
          this.router.navigate(['/lp-lists']);
      }
    )
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

  public onClear_Clicked(){
    this.firstname = this.lastname = this.email = this.phonenumber = this.address1 = 
    this.address2 = this.country = this.state = this.postalcode = "";
  }

  onSave_Clicked(){
    
    if(this.validation()){
      try {
        this.loading=true;
        this.opacity="opacity";
  
        let params={
          firstName:this.firstname,
          lastName: this.lastname,
          userEmail: this.email,
          phoneNumber: this.phonenumber,
          country: this.country,
          state: this.state,
          postalCode: this.postalcode,
          address: this.address1 + " " + this.address2,
          site_name: this.auth.getSiteName(),
          template_id: this.landdingPageID 
        }
        this.token = this.auth.getToken()
        this.api.saveContact(params,this.token).subscribe(data=>{
            this.loading=false;
            this.opacity="";
            if(!data['status']){
              this.toastr.warning(data['msg'])
              return
            }
            if(data['status']){
              this.toastr.success(data['msg'])

              if(this.callingPage == "Invoices")
                this.router.navigate(['/create-invoice'], { queryParams: { landdingPageID: this.landdingPageID } });
              else
                this.router.navigate(['/contacts'], { queryParams: { landdingPageID: this.landdingPageID } });
                
              this.onClear_Clicked();
              return
            }
          },
          err=>{
            console.log(err)
            this.loading=false;
            this.opacity="";
            this.toastr.warning(err.error.msg)
          }
        )
      }
      catch(err){
        console.log(err)
        this.loading=false;
        this.opacity=""
        this.toastr.warning("Please fill the requirements.")
      }
      return
    }
  }

  validation() : boolean{
    if(!this.email){
      this.toastr.warning("Please enter email.")
      return false;
     }
     if(!this.firstname){
      this.toastr.warning("Please enter firstname.")
      return false;
     }
     if(!this.lastname){
      this.toastr.warning("Please enter lastname.")
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
