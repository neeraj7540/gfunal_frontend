import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-edit-module',
  templateUrl: './course-edit-module.component.html',
  styleUrls: ['./course-edit-module.component.css']
})
export class CourseEditModuleComponent implements OnInit {

  name:string = this.auth.getUserName();
  courseId : string;
  @Input() moduleId : string;
  @Input() moduleName : string;
  opacity:string = "";
  public loading: boolean=false;
  public token:string;
  @Output() onSideBarClick = new EventEmitter();

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.auth.getCourseId();

    if(!this.courseId)
      this.router.navigate(['/courselist']);
  }

  onUpdated_Click(){
    try{
      if(this.validation()){
        this.loading=true;
        this.opacity="opacity";
        let params={
          courseId:this.courseId,
          moduleId: this.moduleId,
          newTitle: this.moduleName,
          newSavedAs: true
        }
        this.token = this.auth.getToken()
        this.api.updateCourseModule(params,this.token).subscribe(response=>{
          this.loading=false;
          this.opacity="";
          if(!response['status']){
            this.toastr.warning(response['msg'])
            return
          }
          else{
            this.toastr.success(response['msg']);
            this.auth.sendModuleId(response.data._id);
            this.auth.sendModuleName(this.moduleName);
            this.onSideBarClick.emit("addmodule");
            // window.location.reload();
            return;
          }
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
    if(!this.moduleName){
      this.toastr.warning("Please enter module name.")
      return false;
     }
     return true;
  }

  public check():boolean{
      if(this.loading){
        return true
      }
      else {
        return false
      }
    }

    displaySelectedModule(data) {
      this.moduleName = data;
  }

}