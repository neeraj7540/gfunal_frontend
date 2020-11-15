import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseDataService } from '../student-course-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {

  public loading: boolean = false;
  public courseId: string;
  private acadmyID: string;

  private selectedLesson: any = {}
  private fileData: any;
  public selectedLessonAssignment: any = {}
  public selectedCourse: any;
  private templateCreaterID: string;
  private moduleId: string = "";
  private moduleName: string = "";
  public isSubmitted: boolean = false;

  public selectedFilePath: string = "Upload File";

  constructor(public auth: AuthserviceService,
    public api: ApiServiceService,
    public toastr: ToastrService,
    private studentData: StudentCourseDataService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = false;
    this.checkQueryIsAvailable();
    this.selectedLesson = this.studentData.getSelectedLessonData();
    this.selectedCourse = this.studentData.getSelectedCourseData();

    console.log(this.selectedLesson);
    this.selectedLessonAssignment = this.selectedLesson.lessonInformation.assignmentDetails;
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.courseId) {
          return this.router.navigate(['/cb-template-buy-now']);
        }
        this.templateCreaterID = data.id
        this.courseId = data.courseId;
        this.acadmyID = data.academy;
        this.moduleId = data.moduleId;
        this.moduleName = data.moduleName;
        this.isSubmitted = data.isSubmitted;
        console.log(this.isSubmitted);
        return
      }
    )
  }

  onFileUpload(event) {
    console.log(event.target.files[0].name);

    this.selectedFilePath = event.target.files[0].name;
    this.fileData = event.target.files[0];
  }


  onCancel() {

  }
  onSubmit() {

    // console.log(this.selectedLesson);
    // console.log(this.selectedCourse);
    // console.log(this.acadmyID);
    // console.log(this.courseId);
    // console.log(this.templateCreaterID);

    if (!this.fileData)
      this.toastr.warning("Please select assignement file.")
    else {
      this.loading = true;
      try {
        let formData: FormData = new FormData();
        formData.append('academyCreaterId', this.templateCreaterID);
        formData.append('uploadAssignment', this.fileData);
        formData.append('courseName', this.selectedCourse.courseName);
        formData.append('moduleName', this.moduleName);
        formData.append('lessonName', this.selectedLesson.lessonTitle);
        formData.append('academyId', this.acadmyID);
        formData.append('courseId', this.courseId);
        formData.append('moduleId', this.moduleId);
        formData.append('lessonId', this.selectedLesson.lessonInformation.lessonId);
        formData.append('assignmentId', this.selectedLesson.lessonInformation.AssignmentId);
        formData.append('submit', "true");

        this.api.submitAssignment(formData, this.auth.getStudentToken()).subscribe(response => {
          this.loading = false;
          if (!response.status) {
            this.isSubmitted = true;
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
      catch (err) {
        this.loading = false;
        console.log(err);
      }

    }
  }


  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }
}
