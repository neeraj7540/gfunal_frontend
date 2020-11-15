import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  public dashboard: string='choosetemplate'
  public token: string = this.auth.getToken()
  public package1: string = 'P1'
  public name: string=""
  public loading: boolean = false
  public opacity: string = ""
  public package1css = ""
  public package2css = ""
  public package3css = ""
  public isBasicChecked = false
  public isPlusChecked = false
  public isPremiumChecked = false
  public customPackages : string[] = new Array();
  //userName: string = this.auth.getUserName();

  constructor(private auth: AuthserviceService, private api: ApiService, private route: Router) {
  }

  ngOnInit() {
    if(this.auth.getPackageCheck()){
      this.route.navigate(['/dashboard'])
    }
    else{
      this.getProfile()
    }
  }

 public getProfile(){
   this.api.getProfile(this.token)
   .subscribe(
     data=>{
       console.log(data)
      if(data["status"]){
        this.name = data["data"]["first_name"]+" " + data["data"]["last_name"]
      }
     },
     err=>{
       console.log(err)
     }
   )
 }

 public check(){
   if(this.loading)
     return true
   else
     return false;
 }

 public choosepackage(){
   console.log("basic package", this.isBasicChecked)
   console.log("premium", this.isPremiumChecked)
   console.log("plus", this.isPlusChecked)
   console.log("custom package", this.customPackages)
  //  return false;
   try{
     this.loading=true;
     this.opacity='opacity';
    this.api.choosePackage(this.package1, this.token).subscribe(
      data=>{
        console.log(data)
        this.loading=false;
        this.opacity=''
        if(data['status']){
          this.route.navigate(['/dashboard'])
          this.auth.checkPackage(true)
        }
      },
      err=>{
        this.opacity=''
        this.loading=false
        console.log("er is", err)
      }
    )
   }
   catch(err){
     this.opacity=''
     this.loading=false
   }
  }

  changePackage(data) {
    if(data.target.id == "Basic")
    {
      this.package1css="selected";
      this.package2css = this.package3css = ""
      this.isBasicChecked = true;
      this.isPlusChecked = this.isPremiumChecked = false;
    }
    else if(data.target.id == "Plus")
    {
      this.package2css="selected";
      this.package1css = this.package3css = "";
      this.isPlusChecked = true;
      this.isBasicChecked = this.isPremiumChecked = false;
    }
    else if(data.target.id == "Premium")
    {
      this.package3css="selected";
      this.package2css = this.package1css = "";
      this.isPremiumChecked = true;
      this.isBasicChecked = this.isPlusChecked = false;
    }
 }

 customCheckType_Clicked(data){
   if(data.target.id != ""){
      var result = this.customPackages.find(e => e === data.target.id);
      if(!result)
        this.customPackages.push(data.target.id);
      else
        this.customPackages = this.customPackages.filter(i=> i !== data.target.id);
   }
 }
}
