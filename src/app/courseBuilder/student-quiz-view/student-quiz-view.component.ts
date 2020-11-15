import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseDataService } from '../student-course-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-quiz-view',
  templateUrl: './student-quiz-view.component.html',
  styleUrls: ['./student-quiz-view.component.css']
})
export class StudentQuizViewComponent implements OnInit {

  public loading: boolean = false;
  public courseId: String;
  private selectedLesson: any = {}
  public selectedLessonQuiz: any;
  public quizQuestionIndex: number = 0

  public course: String;
  private acadmyID: string;
  private templateCreaterID: string;
  private moduleId: string;
  private quizId: string;
  private lessonId: string;


  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private studentData: StudentCourseDataService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();

    this.selectedLesson = this.studentData.getSelectedLessonData();
    console.log(this.selectedLesson);
    
    this.selectedLessonQuiz = this.selectedLesson.lessonInformation.quizDetails.questionInformation;

    for (var i = 0; i < this.selectedLessonQuiz.length; i++) {
      var options = JSON.parse(this.selectedLessonQuiz[i].options);
      var questionOptions: any = [];
      for (const property in options) {
        var isAnswerTrue = ""
        if (this.selectedLessonQuiz[i].correctAnswer === property)
          isAnswerTrue = property
        var optionObj = {
          "value": options[property],
          "answer": isAnswerTrue,
          "key": property
        }
        questionOptions.push(optionObj)
      }
      this.selectedLessonQuiz[i].options = questionOptions;
    }
    console.log(this.selectedLessonQuiz)
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.course = data.courseId;
        this.moduleId = data.moduleId;
        this.acadmyID = data.academy
        this.templateCreaterID = data.id
        this.lessonId = data.lessonId
        this.quizId = data.quizId
        return
      }
    )
  }
  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }


  onNext(question: any) {
    if (!question.userSelectedAnswer)
      this.toastr.warning("Please select an answer")
    else {
      this.quizQuestionIndex = this.quizQuestionIndex + 1;
    }
    console.log(question)
  }

  onBack(question: any) {
    this.quizQuestionIndex = this.quizQuestionIndex - 1;
    console.log(question)
  }

  onSubmit(question: any) {
    if (!question.userSelectedAnswer)
      this.toastr.warning("Please select an answer")
    else {
      if (confirm("Are you sure you want to submit this quiz?")) {

        var params = {
          "academyId": this.acadmyID,
          "courseId": this.course,
          "moduleId": this.moduleId,
          "lessonId": this.lessonId,
          "quizId": this.quizId,
          "quizArray": this.selectedLessonQuiz
        }
        console.log(params);
        this.api.submitQuizResult(params, this.auth.getStudentToken()).subscribe(
          data => {
            this.loading = false;
            if (data.status) {
              this.toastr.success("Result")
              this.studentData.saveQuizResultData(this.selectedLessonQuiz)
              this.router.navigate(["/quiz-view-result"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID } })
            } else {
              this.toastr.warning(data.msg)
            }
            return
          },
          err => {
            console.log(err)
            this.loading = false;
            this.toastr.warning(err.error.msg)
            return
          })
      }
    }
    console.log(this.selectedLessonQuiz)
  }


}
