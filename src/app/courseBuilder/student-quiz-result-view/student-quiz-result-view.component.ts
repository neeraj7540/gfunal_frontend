import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseDataService } from '../student-course-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-quiz-result-view',
  templateUrl: './student-quiz-result-view.component.html',
  styleUrls: ['./student-quiz-result-view.component.css']
})
export class StudentQuizResultViewComponent implements OnInit {

  public quizResultData: any = [];

  public correctAnswerCount: number = 0;
  public correctAnswerAverage: number = 0;

  public course: String;
  private acadmyID: string;
  private templateCreaterID: string;

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private studentData: StudentCourseDataService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
    this.quizResultData = this.studentData.getQuizResultData();

    for (var i = 0; i < this.quizResultData.length; i++) {
      var options = this.quizResultData[i].options;

      for (var j = 0; j < options.length; j++) {
        if (this.quizResultData[i].userSelectedAnswer === options[j].answer && this.quizResultData[i].correctAnswer === options[j].answer)
          this.correctAnswerCount = this.correctAnswerCount + 1;
      }

      this.correctAnswerAverage = (this.correctAnswerCount / this.quizResultData.length) * 100;
    }
    console.log(this.quizResultData)
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.course = data.courseId;
        this.acadmyID = data.academy
        this.templateCreaterID = data.id
        return
      }
    )
  }
}
