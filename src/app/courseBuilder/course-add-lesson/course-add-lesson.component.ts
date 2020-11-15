import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-add-lesson',
  templateUrl: './course-add-lesson.component.html',
  styleUrls: ['./course-add-lesson.component.css']
})
export class CourseAddLessonComponent implements OnInit {

  @Input() moduleId : string;
  @Input() moduleTitle : string = "";

  courseId : string;
  lessonname : string;
  opacity:string = "";
  name:string = this.auth.getUserName();
  public loading: boolean=false;
  public token:string;
  
  @Output() onSideBarClick = new EventEmitter();

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    //this.moduleTitle = this.auth.getModuleName();
    this.courseId = this.auth.getCourseId();
    //this.moduleId = this.auth.getModuleId();

    if(!this.courseId)
      this.router.navigate(['/courselist']);
  }

  public check():boolean{
    if(this.loading){
      return true
    }
    else {
      return false
    }
  }

  onSave_Clicked(){
    try{
      if(this.validation()){
        this.loading=true;
        this.opacity="opacity";
        let params={
          courseId:this.courseId,
          moduleId: this.moduleId,
          lessonTitle: this.lessonname
        }
        this.token = this.auth.getToken()
        this.api.createCourseLesson(params,this.token).subscribe(response=>{
          this.loading=false;
          this.opacity="";
          if(!response['status']){
            this.toastr.warning(response['msg'])
          }
          else{
            this.toastr.success(response['msg']);
            this.auth.sendLessonId(response.data._id);
            this.auth.sendLessonName(this.lessonname);
            this.onSideBarClick.emit("editlesson");
            //this.router.navigate(['course-edit-lesson']);
            this.onClear_Clicked();
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

  validation() : boolean{      
    if(!this.lessonname){
      this.toastr.warning("Please enter lesson name.")
      return false;
     }

     return true;
  }

  public onClear_Clicked(){
    this.lessonname = "";
  }

  displaySelectedModule(data) {
    this.moduleTitle = data;
}

}
