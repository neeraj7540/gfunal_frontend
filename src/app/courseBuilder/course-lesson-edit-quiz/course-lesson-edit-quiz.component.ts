import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-lesson-edit-quiz',
  templateUrl: './course-lesson-edit-quiz.component.html',
  styleUrls: ['./course-lesson-edit-quiz.component.css']
})
export class CourseLessonEditQuizComponent implements OnInit {

  courseId : string;
  //questionCount : number = 1;

  @Input() quiztitle : string;
  @Input() receivedData : Array<number>;
  @Input() questionsData : any;
  //@Input() nextquestioncount : number;

  @Output() onSideBarClick = new EventEmitter();

  @Input() receivedData2 : Array<number>;

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.auth.getCourseId();
    if (!this.courseId)
      this.router.navigate(['/courselist']);  
  }

  OnUpdateQuiz_Click(){
    try{
      let params={
        lessonId: this.auth.getLessonId(),
        quizId: this.auth.getQuizId(),
        newQuizName: this.quiztitle,
        newSavedAs: true
      }
      this.api.updateLessonQuizDetails(params,this.auth.getToken()).subscribe(response=>{
        if(!response['status'])
          this.toastr.warning(response['msg'])
        else{
          this.toastr.success(response['msg']);
          this.auth.sendQuizId(response.data._id);
        }
        return;
      },
      err=>{
        console.log(err)
        this.toastr.warning(err.error.msg)
      })
  }
  catch(err){
    console.log(err)
    this.toastr.warning("Please fill the requirements.")
  }
  }

  onDelete_Clicked(){
    if(this.validation())
    {
      if(confirm("Are you sure to delete " + this.quiztitle)){
        try{
          let params={
            courseId: this.courseId,
            lessonId: this.auth.getLessonId(),
            moduleId: this.auth.getModuleId(),
            quizId : this.auth.getQuizId()
          }    
          
          this.api.deleteQuizOfLesson(params,this.auth.getToken()).subscribe(async(response)=>{
            if(!response['status'])
              this.toastr.warning(response['msg']);            
            else{
              this.toastr.success(response['msg']);
              this.quiztitle = "";
              this.receivedData = [];
              //this.questionCount = 1;
              this.auth.sendQuizId("");
              this.onSideBarClick.emit("addlessonquiz");
            }
            return;
          },
          err=>{
            console.log(err)
            this.toastr.warning(err.error.msg)
          })
        }
      catch(err){
        console.log(err)
        this.toastr.warning("Please fill the requirements.")
      }
      }
    }
  }

  validation() : boolean{      
    if(!this.quiztitle){
      this.toastr.warning("Please enter quiz title.")
      return false;
     }

     return true;
  }

  incrementQuestionCounter(count) {
    this.receivedData.push(count);
}

incrementQuestionCounter2(count) {
  this.receivedData2.push(count);
}

AddEditQuestion(){
  if (this.receivedData.length === 1)
    return true;
  else
    return false;
}

}