import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-lesson-add-quiz',
  templateUrl: './course-lesson-add-quiz.component.html',
  styleUrls: ['./course-lesson-add-quiz.component.css']
})
export class CourseLessonAddQuizComponent implements OnInit {

  quiztitle : string;
  courseId : string;
  //receivedData : Array<number> = [];
  //questionCount : number = 1;
  //addUpdateQuiz : string = "ADD QUIZ";

  @Output() onSideBarClick = new EventEmitter();

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.auth.getCourseId();
    if(!this.courseId)
    this.router.navigate(['/courselist']);
  }

  OnAddUpdateQuiz_Click(){
    //if(this.validation()){
    //  if(this.addUpdateQuiz === "ADD QUIZ")
        this.AddQuiz();
    //  else
    //    this.UpdateQuiz();
  //  }
  }

  AddQuiz(){
    try{
        let params={
          courseId: this.courseId,
          lessonId: this.auth.getLessonId(),
          moduleId: this.auth.getModuleId(),
          quizName: this.quiztitle,
          savedAs: true
        }
        this.api.createLessonQuizDetails(params,this.auth.getToken()).subscribe(response=>{
          if(!response['status'])
            this.toastr.warning(response['msg'])
          else{
            this.toastr.success(response['msg']);
            this.auth.sendQuizId(response.data._id);
            //this.receivedData.push(this.questionCount);
            //this.addUpdateQuiz = "UPDATE QUIZ";
            this.onSideBarClick.emit("editlessonquiz");
            this.quiztitle = "";
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

  UpdateQuiz(){
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

  validation() : boolean{      
    if(!this.quiztitle){
      this.toastr.warning("Please enter quiz title.")
      return false;
     }

     return true;
  }

  incrementQuestionCounter(count) {
    //this.receivedData.push(count);
}
}