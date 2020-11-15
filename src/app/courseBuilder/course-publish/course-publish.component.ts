import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-publish',
  templateUrl: './course-publish.component.html',
  styleUrls: ['./course-publish.component.css']
})
export class CoursePublishComponent implements OnInit {

  name : string = this.auth.getUserName();
  opacity: string = "";
  loading: boolean = false;

  data: any;
  categoryType: string;
  templateType: string;
  coursename: string;
  academyId: string;

  constructor(public auth: AuthserviceService,private toastr: ToastrService,
    public api: ApiServiceService,private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
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

  onPublish_Click(){
    try {
      this.loading = true;
      this.opacity = "opacity";
      let formData: FormData = new FormData();
        formData.append('courseId', this.auth.getCourseId());
        formData.append('courseName', this.coursename);
        formData.append('category', this.categoryType);
        formData.append('templateType', this.templateType);
        formData.append('academyId', this.academyId);
        formData.append('newPublish', "true");  
        formData.append('updating', "true");     
      this.api.updateCourseDetails(formData, this.auth.getToken()).subscribe(data => {
        if (data.status)
        {
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
    catch (err) {
      this.loading = false;
      this.opacity = "";
      console.log(err);
      return;
    }
  }

}
