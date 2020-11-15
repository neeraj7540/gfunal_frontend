import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseDataService } from '../student-course-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import Plyr from 'plyr/src/js/plyr';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.css']
})
export class StudentCourseViewComponent implements OnInit {

  public loading: boolean = false;
  public receivedData: Array<any> = []

  public courseLessionsList: Array<any> = []
  public course: String;
  private acadmyID: string;
  private templateCreaterID: string;
  private createrID: string;

  public selectedLesson: any;
  public selectedCourse: any;

  public defaulVideo = ""

  public userComment: string = "";
  public userRating: string = "1";
  public studentProfile: any = {}
  videoSources: Plyr.Source[];

  private moduleId: string = "";
  private moduleName: string = "";

  public options: any;
  @ViewChild('ratingModal', { static: false }) ratingModal: any;
  @ViewChild('plays', { static: false }) player: any;

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private studentData: StudentCourseDataService,
    public toastr: ToastrService,
    public sanitizer: DomSanitizer) {

    this.selectedCourse = this.studentData.getSelectedCourseData();
    this.studentProfile = this.auth.getStudentProfile()
  }

  ngOnInit() {
    this.loading = true;
    this.checkQueryIsAvailable();
    function _getTargetTime(plyr, input) {
      if (
        typeof input === "object" &&
        (input.type === "input" || input.type === "change")
      ) {
        console.log("currentTime " + input.target.value);
        return input.target.value / input.target.max * plyr.media.duration;
      } else {
        // We're assuming its a number
        console.log("currentTime " + Number(input));
        return Number(input);
      }
    }

    this.options = {
      listeners: {
        seek: function customSeekBehavior(e) {
          // var currentTime = this.player.currentTime;
          var newTime = _getTargetTime(this.player, e);
          // We only want rewind functionality
          // Therefore, disallow moving forward
          console.log("newTime " + newTime);
          // console.log("currentTime "+ currentTime);
          // if (newTime) {
          // Works if we add the following:
          // Object.defineProperty(event, "defaultPrevented", {
          //   value: event.defaultPrevented,
          //   writable: true
          // });
          // event.preventDefault = () => {
          //   event.defaultPrevented = true;
          // };
          // e.preventDefault();
          //   console.log(`prevented`);
          //   return false;
          // }
        }
      }
    };
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.id) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.course = data.course;
        this.acadmyID = data.academy;
        this.templateCreaterID = data.id;
        this.createrID = data.createrId;
        this.retriveCoursesList(data.course)
        return
      }
    )
  }


  public retriveCoursesList(courseID: string): void {
    var params = {
      "academyId": this.acadmyID,
      "courseId": courseID,
      "createdById": this.createrID
    }
    this.api.fetchUserEnrolledModules(params, this.auth.getStudentToken()).subscribe(
      data => {
        if (data.status) {
          this.loading = false;
          this.receivedData = data.data;

          var serverCurrentTime = data.currentDate;

          for (var i = 0; i < this.receivedData.length; i++) {
            var courseEnrolledTime = this.receivedData[i].enrolledDate;
            var difference = this.daysBetween(courseEnrolledTime, serverCurrentTime);
            console.log(difference);

            for (var j = 0; j < this.receivedData[i].lessonInfo.length; j++) {
              this.receivedData[i].lessonInfo[j].daysDiffernce = difference;
            }

          }
          
          console.log(this.receivedData);
          this.selectedLesson = this.receivedData[0].lessonInfo[0];
          this.moduleId = this.receivedData[0]._id;
          this.moduleName = this.receivedData[0].moduleTitle;
          this.studentData.saveSelectedLessonData(this.selectedLesson);
          console.log(this.player);

          try {
            var obj = JSON.parse(this.selectedLesson.lessonInformation.videoDetails.videoFile);
            if (obj && typeof obj === "object") {
              this.defaulVideo = obj.data.Location;
            } else {
              this.defaulVideo = this.selectedLesson.lessonInformation.videoDetails.videoFile
            }
          } catch (e) {
            this.defaulVideo = this.selectedLesson.lessonInformation.videoDetails.videoFile
          }

          console.log(this.defaulVideo);
          if (this.defaulVideo.indexOf('youtube') !== -1) {
            let videoSource: Plyr.Source[] = [
              {
                src: this.defaulVideo,
                provider: "youtube",
              },
            ];
            this.videoSources = videoSource;
          }
          else if (this.defaulVideo.indexOf('vimeo') !== -1) {
            let videoSource: Plyr.Source[] = [
              {
                src: this.defaulVideo,
                provider: "vimeo",
              },
            ];
            this.videoSources = videoSource;
          }
          else {
            let videoSource: Plyr.Source[] = [
              {
                src: this.defaulVideo,
                type: "video/mp4",
              },
            ];
            this.videoSources = videoSource;
          }
          return
        }
        return
      },
      err => {
        console.log(err)
        return
      })


  }

  onClickLesson(courseLesson: any, moduleId: string, moduleName: string) {
    console.log(courseLesson.daysDiffernce >= !courseLesson.scheduleTime);
    if (courseLesson.daysDiffernce >= courseLesson.scheduleTime) {
      this.moduleId = moduleId;
      this.moduleName = moduleName;
      console.log(courseLesson.daysDiffernce >= courseLesson.scheduleTime);
      this.selectedLesson = courseLesson;

      console.log(this.selectedLesson)

      try {
        var obj = JSON.parse(this.selectedLesson.lessonInformation.videoDetails.videoFile);

        if (obj && typeof obj === "object") {
          this.defaulVideo = obj.data.Location;
        } else {
          this.defaulVideo = this.selectedLesson.lessonInformation.videoDetails.videoFile;
        }
      } catch (e) {
        this.defaulVideo = this.selectedLesson.lessonInformation.videoDetails.videoFile;
      }

      if (this.defaulVideo.indexOf('youtube') !== -1) {
        let videoSource: Plyr.Source[] = [
          {
            src: this.defaulVideo,
            provider: "youtube",
          },
        ];
        this.videoSources = videoSource;
      } else if (this.defaulVideo.indexOf('vimeo') !== -1) {
        let videoSource: Plyr.Source[] = [
          {
            src: this.defaulVideo,
            provider: "vimeo",
          },
        ];
        this.videoSources = videoSource;
      } else {
        let videoSource: Plyr.Source[] = [
          {
            src: this.defaulVideo,
            type: "video/mp4",
          },
        ];
        this.videoSources = videoSource;
      }
      this.studentData.saveSelectedLessonData(this.selectedLesson);
    }
  }


  openCourseQuiz() {

    if (!this.selectedLesson || this.selectedLesson === undefined)
      this.toastr.warning("Please select lesson first.")
    else {
      this.router.navigate(["/quiz-view"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID, moduleId: this.moduleId, moduleName: this.moduleName } })
    }
  }

  openAssignments() {
    if (!this.selectedLesson || this.selectedLesson === undefined)
      this.toastr.warning("Please select lesson first.")
    else {
      this.router.navigate(["/assignment-view"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID, moduleId: this.moduleId, moduleName: this.moduleName } })
    }
  }


  public submitCoursesRating(): void {
    var params = {
      "academyId": this.acadmyID,
      "courseId": this.course,
      "courseName": this.selectedCourse.courseName,
      "comment": this.userComment,
      "rating": parseInt(this.userRating)
    }
    console.log(params);
    this.api.rateTheCourse(params, this.auth.getStudentToken()).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.toastr.success(data.msg)
          this.ratingModal.hide()
          return
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

  public isQuizOrAssignmentsOpen(actionType: string, selectedLesson: any): void {
    if (!this.selectedLesson || this.selectedLesson === undefined)
      this.toastr.warning("Please select lesson first.")
    else {
      this.loading = true;
      var params = {
        "academyId": this.acadmyID,
        "courseId": this.course,
        "createdById": this.createrID,
        "moduleId": this.moduleId,
        "lessonId": selectedLesson.lessonId,
        "quizId": selectedLesson.quizId,
        "assignmentId": selectedLesson.AssignmentId
      }

      this.api.isQuizAndAssignmentOpen(params, this.auth.getStudentToken()).subscribe(
        data => {
          this.loading = false;
          console.log(data);
          if (actionType === "quiz" && !data.data.quiz)
            this.router.navigate(["/quiz-view"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID, moduleId: this.moduleId, moduleName: this.moduleName, lessonId: selectedLesson.lessonId, quizId: selectedLesson.quizId } })
          else if (actionType === "assignment")
            this.router.navigate(["/assignment-view"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID, moduleId: this.moduleId, moduleName: this.moduleName, isSubmitted: data.data.assignment } })
          else if (actionType === "quiz" && data.data.quiz) {

            var quizInfoDetails = data.data.quizDetails.quizInformation;

            var selectedLessonQuiz = this.selectedLesson.lessonInformation.quizDetails.questionInformation;

            for (var i = 0; i < selectedLessonQuiz.length; i++) {
              var options = JSON.parse(selectedLessonQuiz[i].options);
              var questionOptions: any = [];
              for (const property in options) {
                var isAnswerTrue = ""
                if (selectedLessonQuiz[i].correctAnswer === property)
                  isAnswerTrue = property
                var optionObj = {
                  "value": options[property],
                  "answer": isAnswerTrue,
                  "key": property
                }
                questionOptions.push(optionObj)
              }


              selectedLessonQuiz[i].options = questionOptions;
              selectedLessonQuiz[i].userSelectedAnswer = quizInfoDetails[i].userSelectedAnswer;
            }



            console.log(selectedLessonQuiz)

            this.studentData.saveQuizResultData(selectedLessonQuiz)
            this.router.navigate(["/quiz-view-result"], { queryParams: { id: this.templateCreaterID, courseId: this.course, academy: this.acadmyID } })
          }

        }, err => {
          this.loading = false;

        })
    }
  }

  public check(): boolean {
    if (this.loading) {
      return true
    } else {
      return false
    }
  }

  daysBetween(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    var difference_ms = date2 - date1;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }
  timeupdate(event) {
    // console.log('played', event.detail.plyr.currentTime);

  }

  onVideoEnded(event) {
    console.log(event);
    var params = {
      "academyId": this.acadmyID,
      "academyCreaterId": this.templateCreaterID,
      "courseId": this.course,
      "moduleId": this.moduleId,
      "lessonId": this.selectedLesson.lessonInformation.lessonId,
      "videoId": this.selectedLesson.lessonInformation.videoId,
      "videoDuration": event.detail.plyr.currentTime
    }

    this.api.submitVideoEndedInfo(params, this.auth.getStudentToken()).subscribe(response => {
      this.loading = false;
      if (!response.status) {
        this.toastr.warning(response.msg)
        return
      }
      this.toastr.success(response.msg);
      return;
    },
      err => {
        console.log(err);
        this.loading = false;
        this.toastr.warning(err.error.msg)
      })
  }
}
