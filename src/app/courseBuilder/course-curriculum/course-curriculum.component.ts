import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css']
})
export class CourseCurriculumComponent implements OnInit {

  name: string = this.auth.getUserName();
  loading: boolean = false;
  receivedModuleData: Array<any> = [];
  receivedLessonData: Array<any> = [];
  isCurriculumVisible: boolean = true;
  isAddModuleVisible: boolean = false;
  isEditModuleVisible: boolean = false;
  isAddLessonVisible: boolean = false;
  isEditLessonVisible: boolean = false;
  isLessonVideoVisible: boolean = false;
  isEditLessonVideoVisible: boolean = false;
  isLessonQuizVisible: boolean = false;
  isEditLessonQuizVisible: boolean = false;
  isLessonAssignmentVisible: boolean = false;
  isEditLessonAssignmentVisible: boolean = false;
  moduleName: string;
  moduleId: string;
  lessonId: string;
  lessonname: string;
  assignmentTitle: any = {};
  data: any;

  videoTitle: string;
  videodescription: string;
  selectedVideoFileName: string;
  embendedVideoLink: string;

  categoryType: string;
  templateType: string;
  coursename: string;
  academyId: string;

  quiztitle: string;
  receivedData : Array<number>;
  questionsData : any;
  receivedData2 : Array<number>;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,private activatedRout: ActivatedRoute,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.checkValue();
    this.retrieveModules();
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {
        this.categoryType = value.categoryType;
        this.templateType = value.templateType;
        this.academyId = value.academyId;  
        this.coursename = value.courseName;   
      }
    )
  }

  retrieveModules() {
    this.api.courseModuleListing({ "startingValue": 0, "lastValue": 100, "courseId": this.auth.getCourseId() }, this.auth.getToken()).subscribe(data => {
      if (data.status)
        this.receivedModuleData = data.data
    },
      err => {
        console.log(err)
        return
      }
    )
  }

  retrieveLessons(id) {
    let params = {
      startingValue: 0,
      lastValue: 100,
      courseId: this.auth.getCourseId(),
      moduleId: id
    }

    this.api.courseLessonListing(params, this.auth.getToken()).subscribe(lessonData => {
      if (lessonData.status)
        this.receivedLessonData = lessonData.data
    });
  }

  public check(): boolean {
    if (this.loading)
      return true
    else
      return false
  }

  async displaySelectedDiv(data) {
    switch (data) {
      case "addmodule":
        this.isAddModuleVisible = true;
        this.isCurriculumVisible = this.isEditModuleVisible = this.isAddLessonVisible = this.isEditLessonVisible = this.isEditLessonVideoVisible =
          this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        this.retrieveModules();
        break;
      case "editmodule":
        this.isEditModuleVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditLessonVisible = this.isEditLessonVideoVisible =
          this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        this.moduleName = this.auth.getModuleName();
        this.moduleId = this.auth.getModuleId();
        this.retrieveModules();
        break;
      case "addlesson":
        this.isAddLessonVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isEditModuleVisible = this.isEditLessonVisible = this.isEditLessonVideoVisible =
          this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        this.moduleName = this.auth.getModuleName();
        this.moduleId = this.auth.getModuleId();
        this.retrieveLessons(this.moduleId);
        break;
      case "editlesson":
        this.isEditLessonVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        this.moduleId = this.auth.getModuleId();
        this.moduleName = this.auth.getModuleName();
        this.lessonId = this.auth.getLessonId();
        this.lessonname = this.auth.getLessonName();
        this.retrieveLessons(this.moduleId);
        break;
      case "addlessonvideo":
        this.isLessonVideoVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isEditLessonVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        break;
      case "editlessonvideo":
        this.displayVideo();
        this.isEditLessonVideoVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonAssignmentVisible =
          this.isEditLessonVisible = this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = false;
        break;
      case "addlessonquiz":
        this.retrieveLessons(this.auth.getModuleId());
        this.isLessonQuizVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isEditLessonVisible = this.isLessonVideoVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = this.isEditLessonAssignmentVisible = false;
        break;
      case "editlessonquiz":
        this.displayQuiz();
        this.isEditLessonQuizVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isEditLessonVisible = this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonAssignmentVisible = this.isLessonAssignmentVisible = false;
        break;
      case "addlessonassignment":
        this.isLessonAssignmentVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isEditLessonVisible = this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isEditLessonAssignmentVisible = false;
        break;
      case "editlessonassignment":
        this.displayAssignment();
        this.isEditLessonAssignmentVisible = true;
        this.isCurriculumVisible = this.isAddModuleVisible = this.isAddLessonVisible = this.isEditModuleVisible = this.isEditLessonVideoVisible =
          this.isEditLessonVisible = this.isLessonVideoVisible = this.isLessonQuizVisible = this.isEditLessonQuizVisible = this.isLessonAssignmentVisible = false;
        break;
      default:
      //default block statement;
    }
  }

  async displayAssignment() {
    this.retrieveLessons(this.auth.getModuleId());
    let params = {
      lessonId: this.auth.getLessonId(),
      courseId: this.auth.getCourseId(),
      moduleId: this.auth.getModuleId(),
      AssignmentId: this.auth.getAssignmentId()
    }
    this.api.previewLessonAssignment(params, this.auth.getToken()).subscribe(data => {
      if (data.status)
        this.assignmentTitle = { assignmentTitle: data.data.title, AssignmentContent: data.data.content };
    },
      err => {
        console.log(err)
        return
      }
    )
  }

  async displayVideo() {
    this.retrieveLessons(this.auth.getModuleId());
    let params = {
      lessonId: this.auth.getLessonId(),
      courseId: this.auth.getCourseId(),
      moduleId: this.auth.getModuleId(),
      videoId: this.auth.getVideoId()
    }
    this.api.previewLessonVideo(params, this.auth.getToken()).subscribe(data => {
      if (data.status) {
        this.videoTitle = data.data.title;
        this.videodescription = data.data.videodescription;

        try {
          this.selectedVideoFileName = JSON.parse(data.data.videoFile).data["Key"];
          this.embendedVideoLink = "";
        }
        catch (err) {
          this.embendedVideoLink = data.data.videoFile;
          this.selectedVideoFileName = "";
        }
      }
    },
      err => {
        console.log(err)
        return
      }
    )
  }

  async displayQuiz() {
    this.retrieveLessons(this.auth.getModuleId());
    let params = {
      lessonId: this.auth.getLessonId(),
      courseId: this.auth.getCourseId(),
      moduleId: this.auth.getModuleId(),
      quizId: this.auth.getQuizId()
    }
    this.api.previewLessonQuiz(params, this.auth.getToken()).subscribe(data => {
      console.log("Quiz Data:", data);
      if (data.status) {
        this.receivedData = [];
        this.quiztitle = data.data.quizDetails.quizName;
        var questions = data.data.questions.length + 1;

        for (let i = 1; i <= questions; i++) {
          this.receivedData.push(i + Math.random());
        }

        this.questionsData = data.data.questions.length ? data.data.questions : null;
        if (this.questionsData){
          this.receivedData2 = [];
          this.receivedData2.push(data.data.questions.length + 1);          
        }
      }

      console.log("Received Data:", this.receivedData);
    },
      err => {
        console.log(err)
        return
      }
    )
  }
}