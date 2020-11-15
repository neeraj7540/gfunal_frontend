import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-lesson-edit-quiz-questions-choice',
  templateUrl: './course-lesson-edit-quiz-questions-choice.component.html',
  styleUrls: ['./course-lesson-edit-quiz-questions-choice.component.css']
})
export class CourseLessonEditQuizQuestionsChoiceComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  addQuestionParam: any = {};
  public isCorrectAnswer: boolean = false;
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
  @Input() choiceCount : string;
  @Input() choicetxt: string;
  @Input() correctAnswer: string;

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute) { }
  ngOnInit() {
    this.addQuestionParam.ChoiceContent = this.choicetxt;

    if("choice"+this.choiceCount === this.correctAnswer)
      this.isCorrectAnswer = true;
  }

  hide(){
    this.addQuestionParam.choiceCount = "choice" + this.choiceCount;
    this.addQuestionParam.isCorrectAnswer = this.isCorrectAnswer;

    this.valueChange.emit(this.addQuestionParam);
  }


  taxableItemChecked(e) {
    this.isCorrectAnswer = e.target.checked ? true : false;
    this.hide();
  }

}