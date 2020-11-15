import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  receivedData: Array<any> = []
  name: string = this.auth.getUserName();
  public params: any;

  templateType: string = "";

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retrieveCourses();
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public retrieveCourses(): void {
    this.api.courseList({ "academyId": this.auth.getAcademyId() }, this.auth.getToken()).subscribe(data => {
      console.log("Courses List:", data);
      if (data.status) {
        var exceljsonobj = [];
        for (var v in data.data) {
          var path = data.data[v].logo !== null ? JSON.parse(data.data[v].logo).data["Location"] : "../assets/images/maths.png";
          this.templateType = data.data[v].templateType;
          exceljsonobj.push({
            "id": data.data[v]._id,
            "courseName": data.data[v].courseName,
            "courseDescription": data.data[v].courseDescription,
            "logo": path,
            "publish": data.data[v].publish,
            "templateType": data.data[v].templateType,
            "category": data.data[v].category,
            "totalNumberOfLesson": data.data[v].totalNumberOfLesson
          });
        }
        this.receivedData = exceljsonobj;
      }
      this.loading = false;
      this.opacity = "";
      return;
    },
      err => {
        this.loading = false;
        this.opacity = "";
        console.log(err)
        return;
      }
    )
  }

  onDelete_Clicked(deletedItem) {
    if (confirm("Are you sure to delete course: " + deletedItem.courseName)) {
      this.loading = true;
      this.opacity = "opacity";
      this.api.deleteCourse({ "courseId": deletedItem.id }, this.auth.getToken()).subscribe(data => {
        if (data.status) {
          this.toastr.success(data['msg']);
          this.retrieveCourses();
        }
        this.loading = false;
        this.opacity = "";
        return;
      },
        err => {
          this.loading = false;
          this.opacity = "";
          console.log(err)
          return;
        }
      )
    }
  }

  onAdd_Clicked() {
    this.router.navigate(['/create-course-details'],
      {
        queryParams:
        {
          categoryType: "Individual",
          templateType: this.templateType,
          academyId: this.auth.getAcademyId()
        }
      });
  }

  onUpdate_Clicked(data) {
    this.router.navigate(['/create-course-details'],
      {
        queryParams:
        {
          categoryType: data.category,
          templateType: data.templateType,
          academyId: this.auth.getAcademyId(),
          subjectId: data.id,
          courseName: data.courseName
        }
      });
  }

  onPublish_Click(course) {
    try {
      if (course.totalNumberOfLesson > 0) {
        this.loading = true;
        this.opacity = "opacity";
        let formData: FormData = new FormData();
        formData.append('courseId', course.id);
        formData.append('courseName', course.courseName);
        formData.append('category', course.category);
        formData.append('templateType', course.templateType);
        formData.append('academyId', this.auth.getAcademyId());
        formData.append('newPublish', "true");
        formData.append('updating', "true");
        this.api.updateCourseDetails(formData, this.auth.getToken()).subscribe(data => {
          if (data.status) {
            this.toastr.success("Course published Successfully.");
            this.router.navigate(['/academylist']);
          }

          this.loading = false;
          this.opacity = "";
          return;
        },
          err => {
            this.loading = false;
            this.opacity = "";
            console.log("Error fetch module and lesson:", err)
            return;
          }
        )
      }
      else
        this.toastr.warning("Please update course.")
    }
    catch (err) {
      this.loading = false;
      this.opacity = "";
      console.log(err);
      return;
    }
  }
}
