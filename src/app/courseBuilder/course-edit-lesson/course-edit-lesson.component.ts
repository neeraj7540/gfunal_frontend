import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-edit-lesson',
  templateUrl: './course-edit-lesson.component.html',
  styleUrls: ['./course-edit-lesson.component.css']
})
export class CourseEditLessonComponent implements OnInit {

  name:string = this.auth.getUserName();
  opacity:string = "";
  loading: boolean=false;
  token:string;
  @Input() moduleId : string;
  @Input() moduleTitle : string;
  @Input() lessonId : string;
  @Input() lessonname : string;

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    //this.checkValue();
  }

//   public checkValue():void{
//     this.moduleId = this.auth.getModuleId();
//     this.lessonId = this.auth.getLessonId();
//     this.lessonname = this.auth.getLessonName();
    

//     if(!this.moduleId && !this.lessonId)
//         this.router.navigate(['/courselist']);
// }

onUpdated_Click(){
  try{
    if(this.validation()){
      this.loading=true;
      this.opacity="opacity";
      let params={
        lessonId:this.lessonId,
        moduleId: this.moduleId,
        newTitle: this.lessonname,
        newSavedAs: true
      }
      this.token = this.auth.getToken()
      this.api.updateCourseLesson(params,this.token).subscribe(response=>{
        this.loading=false;
        this.opacity="";
        if(!response['status']){
          this.toastr.warning(response['msg'])
          return
        }
        else{
          this.auth.sendLessonName(this.lessonname);
          this.toastr.success(response['msg']);
          window.location.reload();
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
  if(!this.lessonname){
    this.toastr.warning("Please enter lesson name.")
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

  displaySelectedLesson(data) {
    this.lessonname = data;
}

}
