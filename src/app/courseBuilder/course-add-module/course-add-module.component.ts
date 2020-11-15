import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-add-module',
  templateUrl: './course-add-module.component.html',
  styleUrls: ['./course-add-module.component.css']
})
export class CourseAddModuleComponent implements OnInit {

  name:string = this.auth.getUserName();
  moduletitle : string;
  opacity:string = "";
  public loading: boolean=false;
  public token:string;
  courseId : string;
  @Output() onSideBarClick = new EventEmitter();

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.auth.getCourseId();
    if(!this.courseId)
    this.router.navigate(['/courselist']);
  }

  onSave_Clicked(){
    try{
      
      if(this.validation()){
        this.loading=true;
        this.opacity="opacity";
        let params={
          courseId:this.courseId,
          moduleTitle: this.moduletitle
        }
        this.token = this.auth.getToken()
        this.api.createCourseModule(params,this.token).subscribe(response=>{
          if(!response['status'])
            this.toastr.warning(response['msg'])
          else{
            this.toastr.success(response['msg']);
            this.auth.sendModuleId(response.data._id);
            this.auth.sendModuleName(this.moduletitle);
            this.onSideBarClick.emit("editmodule");
            //this.router.navigate(['course-edit-module']);
            this.onClear_Clicked();
          }
          this.loading=false;
          this.opacity="";
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

  validation() : boolean{      
    if(!this.moduletitle){
      this.toastr.warning("Please enter module name.")
      return false;
     }
     return true;
  }

  public onClear_Clicked(){
    this.moduletitle = "";
  }

  public check():boolean{
    if(this.loading)
      return true
    else 
      return false
  }

}