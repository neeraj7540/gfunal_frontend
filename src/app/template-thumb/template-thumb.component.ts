import { Component, OnInit, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-template-thumb',
  templateUrl: './template-thumb.component.html',
  styleUrls: ['./template-thumb.component.css']
})
export class TemplateThumbComponent implements OnInit {

  @Input() temp_name: string;
  @Input() preview: string;
  @Input() site_name: string;
  @Input() template_id: string;
  @Input() temp_category:string;
  @Input() temp_call: string;
  @Input() landingPage_id: string;

  public loading: boolean=false;
  public sitename: string;
  public params: any;
  public token:string;
  public chooseTemplate: Boolean;
  constructor(public route: Router,public api: ApiService,public toastr: ToastrService,public auth: AuthserviceService) { }

  openEditor(){
    if(!this.sitename){
      this.toastr.warning("Please enter the site name")
      return
    }
    this.params={
      site_name: this.sitename,
      landgingPageType:"lp1",
      landingPageCategory: this.temp_category
    }
    this.token = this.auth.getToken();
    this.api.landingPageName(this.params, this.token).subscribe(data=>{
        if(data.status){
          this.toastr.success(data.msg);
          this.route.navigate(['test'],{queryParams:{site_name: this.sitename}})
          //this.route.navigate(['test'],{queryParams:{template_id :data.data._id, site_name: this.sitename, landingPageId:data.data.landingpage_id}})
          return
        }
        this.toastr.warning(data.msg)
        return
      },
      error=>{
        console.log("error is", error)
        this.toastr.error(error.error.msg)
        return
      }
    )
    // this.route.navigate(['test'])
  }

  ngOnInit() {}

  public showChooseTemplate():Boolean{
    if(this.preview)
      return false;
    else
      return true
  }

  public showChooseTemplateBtn():Boolean{
    if(this.temp_call == "SaveLanding")
      return false;
    else
      return true
  }

  openDirectEditor(){
    this.route.navigate(['test'], {queryParams:{landingPageId: this.landingPage_id, site_name: this.temp_name}});
  }

  public draft():void{
    this.route.navigate(['test'],{
      queryParams:{
        site_name: this.temp_name,
        template_id: this.template_id,
        landingPageId: this.landingPage_id,
        calling: "UpdateDraft"
      }
    })
  }

  public previewTemplate():void{
    
    this.route.navigate(['preview-landing-page'],{
      queryParams:{
        template_id: this.template_id
      }
    })
  }

  publishTemplate(){
    this.loading=true;
    this.token = this.auth.getToken()
    this.api.publishDraftedLandingPage({"template_id": this.template_id,"landingPageID" : this.landingPage_id}, this.token).subscribe(data=>{
      console.log('Published Data:', data);
      this.loading=false;
      this.toastr.success(data.msg);
      return;
      },
      err=>{
        console.log(err)
        return;
      }
    )
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }
}