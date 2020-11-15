import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-course-details',
  templateUrl: './create-course-details.component.html',
  styleUrls: ['./create-course-details.component.css']
})
export class CreateCourseDetailsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  coursename: string;
  coursedescription: string;
  fileData: File = null;
  data: any;
  categoryType: string;
  templateType: string;
  subjectId: string;
  academyId: string;
  imgURL: any = "../assets/images/user-photo.png";
  name: string = this.auth.getUserName();
  isNameDisabled : string = "";

  constructor(private toastr: ToastrService, public api: ApiServiceService, private auth: AuthserviceService,
    private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {
        this.categoryType = value.categoryType;
        this.templateType = value.templateType;
        this.subjectId = value.subjectId;
        this.academyId = value.academyId;  
        this.coursename = value.courseName;   

        if (this.coursename)
          this.isNameDisabled = "disabled";

      }
    )
  }

  onFileUpload(event) {

    var size = event.target.files[0].size / 1024;
    if (size < 200) {
      this.fileData = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
    else
      alert('This file size is large.');
  }

  onNext_Clicked() {
    if(this.validation()){
      if(this.categoryType === "Individual")
        this.AddIndividual();
      else
        this.AddSchoolTraining();
    }
  }

  AddIndividual(){
    try {
        this.loading = true;
        this.opacity = "opacity";

        let formData: FormData = new FormData();
        formData.append('category', this.categoryType);
        formData.append('templateType', this.templateType);
        formData.append('courseName', this.coursename);
        formData.append('courseDescription', this.coursedescription);
        formData.append('CourseLogo', this.fileData);
        formData.append('academyId', this.academyId);

        this.api.createCoures(formData, this.auth.getToken()).subscribe(response => {
          if (!response['status']) 
            this.toastr.warning(response['msg'])
          else {
            this.toastr.success(response['msg']);
            this.auth.sendCourseId(response.data._id);
            this.router.navigate(['course-curriculum'],
            { queryParams: 
              { 
                categoryType: this.categoryType, 
                templateType: this.templateType,
                academyId: this.academyId,
                courseName: this.coursename
              } 
            });
            this.onClear_Clicked();
          }
          this.loading = false;
          this.opacity = "";
          return;
        },
          err => {
            console.log(err)
            this.loading = false;
            this.opacity = "";
            this.toastr.warning(err.error.msg)
          })
    }
    catch (err) {
      console.log(err)
      this.loading = false;
      this.opacity = "";
      this.toastr.warning("Please fill the requirements.")
    }
  }

  AddSchoolTraining(){
    try {
        this.loading = true;
        this.opacity = "opacity";

        let formData: FormData = new FormData();
        formData.append('CourseLogo', this.fileData);
        formData.append('courseId', this.subjectId);
        formData.append('courseName', this.coursename);
        formData.append('courseDescription', this.coursedescription);
        formData.append('updating', "true");       
        
        this.api.updateCourseDetails(formData, this.auth.getToken()).subscribe(response => {
          if (!response['status']) 
            this.toastr.warning(response['msg'])
          else {
            this.toastr.success(response['msg']);
            this.auth.sendCourseId(response.data._id);
            this.router.navigate(['course-curriculum'],
            { queryParams: 
              { 
                categoryType: this.categoryType, 
                templateType: this.templateType,
                academyId: this.academyId,
                courseName: this.coursename
              } 
            });
            this.onClear_Clicked();
          }
          this.loading = false;
          this.opacity = "";
          return;
        },
          err => {
            console.log(err)
            this.loading = false;
            this.opacity = "";
            this.toastr.warning(err.error.msg)
          })
    }
    catch (err) {
      console.log(err)
      this.loading = false;
      this.opacity = "";
      this.toastr.warning("Please fill the requirements.")
    }
  }

  validation(): boolean {
    if (!this.coursename) {
      this.toastr.warning("Please enter course name.")
      return false;
    }
    if (!this.coursedescription) {
      this.toastr.warning("Please enter course description.")
      return false;
    }
    if (!this.fileData) {
      this.toastr.warning("Please select a file.")
      return false;
    }

    return true;
  }

  public onClear_Clicked() {
    this.coursename = this.coursedescription = "";
    this.imgURL = "../assets/images/upload-icon.png";
  }

  public check(): boolean {
    if (this.loading)
      return true
    else
      return false
  }
}