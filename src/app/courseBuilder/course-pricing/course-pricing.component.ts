import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-pricing',
  templateUrl: './course-pricing.component.html',
  styleUrls: ['./course-pricing.component.css']
})
export class CoursePricingComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  name: string = this.auth.getUserName();
  paymentType: string = "free";
  isFreeChecked: boolean = true;
  isPaidChecked: boolean = false;
  orginalPrice: number;
  DiscountedPrice: number;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router) { }

  ngOnInit() {
  }

  onSkip_Clicked() {
    this.router.navigate(['course-publish']);
  }

  onSave_Clicked() {
    try{
      if(this.validation()){
        this.loading=true;
        this.opacity="opacity";
        let params={};       
        
        if(this.isFreeChecked){
          params = {
            courseId : this.auth.getCourseId(),            
            paymentType: this.paymentType
          };
        }
        else{
          params = {
            courseId : this.auth.getCourseId(),
            paymentType: this.paymentType,
            orginalPrice: this.orginalPrice,
            DiscountedPrice: this.DiscountedPrice
          };
        }
        
        this.api.coursePricingPage(params,this.auth.getToken()).subscribe(response=>{
          this.loading=false;
          this.opacity="";
          if(!response['status']){
            this.toastr.warning(response['msg'])
          }
          else{
            this.toastr.success(response['msg']);
            this.router.navigate(['course-publish']);
          }
          return;
        },
        err=>{
          console.log(err)
          this.loading=false;
          this.opacity="";
          this.toastr.warning(err.error.msg)
        })
      }
    }
    catch(err){
      console.log(err)
      this.loading=false;
      this.opacity="";
      this.toastr.warning("Please fill the requirements.")
    }
  }

  validation(): boolean {
    if (this.isPaidChecked) {
      if(!this.orginalPrice){
        this.toastr.warning("Please enter original price.")
        return false;
       }
       if(!this.DiscountedPrice){
        this.toastr.warning("Please enter discount price.")
        return false;
       }
    }

    return true;
  }

  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  Package_Selected(e) {
    this.paymentType = e.target.id;

    if (this.paymentType === "paid") {
      this.isPaidChecked = true;
      this.isFreeChecked = false;
    }
    else {
      this.isFreeChecked = true;
      this.isPaidChecked = false;
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