import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-lesson-add-quiz-questions',
  templateUrl: './course-lesson-add-quiz-questions.component.html',
  styleUrls: ['./course-lesson-add-quiz-questions.component.css']
})
export class CourseLessonAddQuizQuestionsComponent implements OnInit {

  @Input() questionCount: string;
  @Input() selectedIndex: number;
  visibleIndex = 0;
  receivedData: Array<number> = [];
  choiceCount: number = 0;
  receivedChoices: Array<any> = [];
  addQuestionParam: any = {};
  correctAnswer: string = "";
  @Output() incrementQuestion = new EventEmitter();
  isDelQuesVisible: boolean = true;
  questionID : string = "";

  public editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "300px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink"]
    ]
  };

  constructor(private toastr: ToastrService, public api: ApiServiceService, private auth: AuthserviceService,
    private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {  
    console.log("Add question call");
  }

  onAddChoice_Click() {
    if (!this.addQuestionParam.Question) {
      this.toastr.warning("Please ask question first.")
      return false;
    }
    this.choiceCount += 1;
    this.receivedData.push(this.choiceCount);
  }

  OnQuestionHideShow_Click() {
    this.visibleIndex = this.visibleIndex === this.selectedIndex ? -1 : this.selectedIndex;
  }

  displayCounter(data) {
    if (this.receivedChoices.length > 0) {
      this.receivedChoices.forEach(element => {
        if (data.choiceCount === element.choiceCount) {
          this.receivedChoices.splice(this.receivedChoices.indexOf(element), 1);
          this.receivedChoices.push(data);
        }
        else
          this.receivedChoices.push(data);
      });
    }
    else
      this.receivedChoices.push(data);

    this.receivedChoices = Array.from(new Set(this.receivedChoices))
  }

  onAddQuestion_Click() {
    if (this.validation()) {
      try {
        let params = {
          lessonId: this.auth.getLessonId(),
          quizId: this.auth.getQuizId(),
          question: this.addQuestionParam.Question,
          options: this.getChoicesData(),
          correctAnswer: this.correctAnswer,
          savedAs: true
        }

        this.api.addQuizQuestions(params, this.auth.getToken()).subscribe(response => {
          if (!response['status'])
            this.toastr.warning(response['msg'])
          else {
            this.toastr.success(response['msg']);
            this.questionID = response.data._id;
            //this.auth.sendQuizQuestionID(response.data._id);
            this.isDelQuesVisible = false;
            //this.questionCount = (parseInt(this.questionCount) + 1) + "";
            this.incrementQuestion.emit((parseInt(this.questionCount) + 1));
            //console.log("Question Quiz Id:", this.auth.getQuizQuestionID());
          }
          return;
        },
          err => {
            console.log(err)
            this.toastr.warning(err.error.msg)
          })
      }
      catch (err) {
        console.log(err)
        this.toastr.warning("Please fill the requirements.")
      }
    }
  }

  onDeleteQuestion_Click(data) {
    if (confirm("Are you sure to delete this question?")) {
      try {
        let params = {
          quizQuestionID: data.target.id, //this.auth.getQuizQuestionID(),
          lessonId: this.auth.getLessonId(),
          quizId: this.auth.getQuizId(),
          courseId: this.auth.getCourseId(),
          moduleId: this.auth.getModuleId()
        }

        this.api.deleteQuizQuestion(params, this.auth.getToken()).subscribe(response => {
          if (!response['status']) {
            this.toastr.warning(response['msg']);
          }
          else {
            this.toastr.success(response['msg']);
            // this.questionCount = (parseInt(this.questionCount) - 1) + "";
            // this.incrementQuestion.emit(this.questionCount);
          }
          return;
        },
          err => {
            console.log(err)
            this.toastr.warning(err.error.msg)
          })
      }
      catch (err) {
        console.log(err)
        this.toastr.warning("Please fill the requirements.")
      }
    }
  }

  getChoicesData() {
    var choices: any = {};
    this.receivedChoices.forEach(element => {
      choices[element.choiceCount] = element.ChoiceContent;

      if (element.isCorrectAnswer)
        this.correctAnswer = element.choiceCount;
    });
    return choices;
  }

  validation(): boolean {
    if (!this.addQuestionParam.Question) {
      this.toastr.warning("Please ask question first.")
      return false;
    }

    return true;
  }

}