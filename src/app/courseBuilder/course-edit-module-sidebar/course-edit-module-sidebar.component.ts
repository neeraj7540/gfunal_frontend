import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-edit-module-sidebar',
  templateUrl: './course-edit-module-sidebar.component.html',
  styleUrls: ['./course-edit-module-sidebar.component.css']
})
export class CourseEditModuleSidebarComponent implements OnInit {

  @Output() selectedModule = new EventEmitter();
  @Output() selectedLesson = new EventEmitter();
  @Input() ModuleDataList: Array<any> = [];
  @Input() LessonDataList: Array<any> = [];

  @Output() onSideBarClick = new EventEmitter();

  isVideoActive: string = "active";
  isQuizActive: string = "";
  isAssignmentActive: string = "";
  visibleIndex = -1;
  visibleLessonIndex = -1;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.retrieveModules();
  }

  // retrieveModules(){
  //   this.api.courseModuleListing({"startingValue": 0,"lastValue" : 100,"courseId":this.auth.getCourseId()}, this.auth.getToken()).subscribe(data=>{
  //       if(data.status)
  //         this.receivedModuleData = data.data
  //     },
  //     err=>{
  //       console.log(err)
  //       return
  //     }
  //   )
  // }

  onNewModule_Clicked() {
    //this.router.navigate(['course-add-module']);
    this.onSideBarClick.emit("addmodule");
  }

  moduleSelected(item) {
    this.auth.sendModuleId(item._id);
    this.auth.sendModuleName(item.moduleTitle);
    this.onSideBarClick.emit("editmodule");
    //this.selectedModule.emit(item.moduleTitle);
  }

  lessonSelected(item) {
    this.auth.sendLessonId(item._id);
    this.auth.sendLessonName(item.lessonTitle);
    this.onSideBarClick.emit("editlesson");
    //this.selectedLesson.emit(item.lessonTitle);
  }

  onModuleDeleted_Click(data) {
    if (confirm("Are you sure to delete " + data.moduleTitle)) {
      try {
        let params = {
          courseId: this.auth.getCourseId(),
          moduleId: data._id,
        }
        this.api.deleteModuleOfCourse(params, this.auth.getToken()).subscribe(async (response) => {
          if (!response['status']) {
            this.toastr.warning(response['msg']);
          }
          else {
            this.toastr.success(response['msg']);
            this.onSideBarClick.emit("addmodule");
            //this.retrieveModules();
            //await this.delay(1000);
            //var lastItem = this.receivedModuleData[this.receivedModuleData.length -1];
            // this.auth.sendModuleId(lastItem._id);
            // this.auth.sendModuleName(lastItem.moduletitle); 
            // this.selectedModule.emit(lastItem.moduleTitle);
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

  //   delay(ms: number) {
  //     return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  onAddLesson_Click(item,indx) {
    this.auth.sendModuleId(item._id);
    this.auth.sendModuleName(item.moduleTitle);
    this.onSideBarClick.emit("addlesson");
    // this.router.navigate(['course-add-lesson']);
    this.onExpand_Click(item);
    this.onModuleHide_click(indx);
  }

  onExpand_Click(item) {
    this.LessonDataList = [];
    let params = {
      startingValue: 0,
      lastValue: 100,
      courseId: this.auth.getCourseId(),
      moduleId: item._id
    }

    this.api.courseLessonListing(params, this.auth.getToken()).subscribe(lessonData => {
      if (lessonData.status)
        this.LessonDataList = lessonData.data
    });
  }

  onLessonDeleted_Click(data) {
    if (confirm("Are you sure to delete " + data.lessonTitle)) {
      try {
        let params = {
          courseId: this.auth.getCourseId(),
          moduleId: this.auth.getModuleId(),
          lessonId: data._id
        }
        this.api.deleteLessonOfModule(params, this.auth.getToken()).subscribe(async (response) => {
          if (!response['status']) {
            this.toastr.warning(response['msg']);
          }
          else {
            this.toastr.success(response['msg']);
            this.onSideBarClick.emit("addlesson");
            //this.refreshLessons();

            // await this.delay(1000);

            // var lastItem = this.LessonDataList[this.LessonDataList.length -1];
            // this.auth.sendLessonId(lastItem._id);
            // this.auth.sendLessonName(lastItem.lessontitle); 
            // this.selectedLesson.emit(lastItem.lessontitle);
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

  // refreshLessons(){
  //   let params={
  //     startingValue: 0,
  //     lastValue: 100,
  //     courseId:this.auth.getCourseId(),
  //     moduleId: this.auth.getModuleId()
  //   } 

  //   this.api.courseLessonListing(params, this.auth.getToken()).subscribe(lessonData=>{
  //     if(lessonData.status)
  //         this.receivedLessonData = lessonData.data
  //   });
  // }

  OnVideo_Clicked(lesson, module) {
     //console.log("selected lesson:", lesson);
    // console.log("selected module:", module);

    this.isVideoActive = "active";
    this.isQuizActive = this.isAssignmentActive = "";

    this.auth.sendModuleId(module._id);
    this.auth.sendModuleName(module.moduleTitle);
    this.auth.sendLessonId(lesson._id);
    this.auth.sendLessonName(lesson.lessonTitle);
    this.auth.sendVideoId(lesson.videoId);
    if (lesson.videoId === null)
      this.onSideBarClick.emit("addlessonvideo");
    else
      this.onSideBarClick.emit("editlessonvideo");
  }
 
  OnQuiz_Clicked(lesson, module) {

    console.log("selected lesson:", lesson);
    console.log("selected module:", module);

    this.isQuizActive = "active";
    this.isVideoActive = this.isAssignmentActive = "";

    this.auth.sendModuleId(module._id);
    this.auth.sendModuleName(module.moduleTitle);
    this.auth.sendLessonId(lesson._id);
    this.auth.sendLessonName(lesson.lessonTitle);
    this.auth.sendQuizId(lesson.quizId);

    if (lesson.quizId === null)
      this.onSideBarClick.emit("addlessonquiz");
    else
      this.onSideBarClick.emit("editlessonquiz");
  }

  OnAssignment_Clicked(lesson, module) {
    this.isAssignmentActive = "active";
    this.isVideoActive = this.isQuizActive = "";

    this.auth.sendModuleId(module._id);
    this.auth.sendModuleName(module.moduleTitle);
    this.auth.sendLessonId(lesson._id);
    this.auth.sendLessonName(lesson.lessonTitle);
    this.auth.sendAssignmentId(lesson.AssignmentId);

    if (lesson.AssignmentId === null)
      this.onSideBarClick.emit("addlessonassignment");
    else
      this.onSideBarClick.emit("editlessonassignment");
    //this.router.navigate(['course-lesson-assignment']);
  }

  onModuleHide_click(ind) {
    this.visibleIndex = this.visibleIndex === ind ? -1 : ind;
  }

  onLessonHide_click(ind) {
    this.visibleLessonIndex = this.visibleLessonIndex === ind ? -1 : ind;
  }
}