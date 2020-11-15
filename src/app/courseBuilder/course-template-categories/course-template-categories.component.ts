import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-template-categories',
  templateUrl: './course-template-categories.component.html',
  styleUrls: ['./course-template-categories.component.css']
})
export class CourseTemplateCategoriesComponent implements OnInit {

  opacity:string = "";
  loading: boolean=false;
  name:string = this.auth.getUserName();
  token:string;
  receivedData:Array<any>=[];
  selectedType: string;
  AcademyName:string="";
  // Biography:string="";
  fileData: File = null;
  URL:string="";

  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;
  @ViewChild('basicModal',{static: false}) addAcademyModal: any;

  constructor(private toastr: ToastrService,public auth: AuthserviceService,private route: ActivatedRoute,
              private router: Router,public api: ApiServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.auth.sendCourseId("");
    this.auth.sendModuleId("");
    this.auth.sendModuleName("");
    this.auth.sendLessonId("");
    this.auth.sendLessonName("");
    this.auth.sendQuizId("");
    this.auth.sendAssignmentId("");
    this.auth.sendVideoId("");
    this.auth.sendIntialInformationID("");
    this.auth.sendCourcePackageID("");
  }

  public check(): boolean {
    return this.loading ? true : false;  
  }

  onSelectType(e){
    this.selectedType = e;
    this.addAcademyModal.show();
  }

  // onFileUpload(event) {
  //   this.fileData = event.target.files[0];
  // }

  onAddAcademy(){
    try {
      if (this.validation()) {
        this.loading = true;
        this.opacity = "opacity";

        let formData: FormData = new FormData();
        formData.append('name', this.AcademyName);
        // formData.append('biography', this.Biography);
        formData.append('academyLogo', this.fileData);
        formData.append('url', this.URL);

        this.token = this.auth.getToken()
        this.api.createAcademy(formData, this.token).subscribe(response => {
          if (!response['status'])
            this.toastr.warning(response['msg'])
          else {
            this.toastr.success(response['msg']);
            this.router.navigate(['/choosecoursetemplate'],{ queryParams: { categoryType: this.selectedType, academyId: response['data']._id} });
            //this.AcademyName = this.Biography = this.URL = "";
            this.AcademyName = this.URL = "";
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
    }
    catch (err) {
      console.log(err)
      this.loading = false;
      this.opacity = "";
      this.toastr.warning("Please fill the requirements.")
    }
  }

  validation(): boolean {
    if (!this.AcademyName) {
      this.toastr.warning("Please enter academy name.")
      return false;
    }
    // if (!this.Biography) {
    //   this.toastr.warning("Please enter biography.")
    //   return false;
    // }
    if (!this.fileData) {
      this.toastr.warning("Please select a file.")
      return false;
    }

    return true;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  previewUrl: any = null;
  preview() {    
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

}
