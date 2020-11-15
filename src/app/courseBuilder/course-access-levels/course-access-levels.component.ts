import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-access-levels',
  templateUrl: './course-access-levels.component.html',
  styleUrls: ['./course-access-levels.component.css']
})
export class CourseAccessLevelsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  name: string = this.auth.getUserName();
  packageName: string = "";
  packagePrice: string = "";
  receivedData: Array<any> = [];
  isDivVisible: boolean = false;
  AccessDetailsList: Array<any> = [];
  isSideDivVisible: boolean = false;
  accessDetails: any;
  saveUpdateBtnTxt: string = "Save";

  data: any;
  categoryType: string;
  templateType: string;
  coursename: string;
  academyId: string;

  @ViewChild('basicModal',{static: false}) funnelUpdateModal: any;

  constructor(private toastr: ToastrService, public api: ApiServiceService, private auth: AuthserviceService,
    private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.checkValue();
    this.retrieveModuleLessonListing();
    this.retrieveAccessDetailsofCourse();
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

  retrieveModuleLessonListing(): void {
    this.api.modulesAndLessonListing({ "courseId": this.auth.getCourseId() }, this.auth.getToken()).subscribe(data => {
      console.log("received Data:", data);
      if (data.status) {
        this.receivedData = data.data;

        console.log("cource Id Data:", this.auth.getCourseId());
        console.log("received Data:", this.receivedData);
      }
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

  retrieveAccessDetailsofCourse(): void {
    this.api.fetchAccessDetailsofCourse({ "courseId": this.auth.getCourseId() }, this.auth.getToken()).subscribe(data => {
      var exceljsonobj = [];
      if (data.status) {
        for (var v in data.data) {
          this.isDivVisible = this.isSideDivVisible = true;
          exceljsonobj.push({
            "id": data.data[v]._id,
            "name": data.data[v].packageName + " (" + data.data[v].packagePrice + ")",
            "accessLessonOfPackageID": data.data[v].packageinformationId
          });
        }
        this.AccessDetailsList = exceljsonobj;
        if (this.AccessDetailsList.length >= 1){
          this.auth.sendCourcePackageID(this.AccessDetailsList[0].id);
          this.previewMoudles(this.AccessDetailsList[0].id);
          this.accessDetails = this.AccessDetailsList[0];
        }
        else if(this.AccessDetailsList.length == 0)
        {
          this.auth.sendCourcePackageID("");
          this.isDivVisible = this.isSideDivVisible = false;
        }
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

  AddAccessPackage() {
    if (this.validateData()) {
      try {
        let params = {
          courseId: this.auth.getCourseId(),
          packageName: this.packageName,
          packagePrice: parseInt(this.packagePrice)
        }
        this.api.courseAccessDetails(params, this.auth.getToken()).subscribe(response => {
          if (!response['status']) 
            this.toastr.warning(response['msg'])
          else {
            this.isDivVisible = this.isSideDivVisible = true;
            this.AccessDetailsList.push({
              "id": response.data._id,
              "name": this.packageName + " (" + this.packagePrice + ")",
              "accessLessonOfPackageID": ""
            });
            this.accessDetails = this.AccessDetailsList[this.AccessDetailsList.length - 1];
            //console.log("this.accessDetails", this.accessDetails);
            this.toastr.success(response['msg']);
            this.packageName = this.packagePrice = "";
            this.auth.sendCourcePackageID(response.data._id);
            this.retrieveModuleLessonListing();
            this.funnelUpdateModal.hide();
            this.saveUpdateBtnTxt = "Save";
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

  validateData(): boolean {
    if (!this.packageName) {
      this.toastr.warning("Please enter package name.")
      return false;
    }
    else if (!this.packagePrice) {
      this.toastr.warning("Please enter package price.")
      return false;
    }
    return true;
  }

  keyPress(event: any) {
    const pattern = /[0-9\.\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  check(): boolean {
    if (this.loading) 
      return true
    else 
      return false
  }

  onSkip_Clicked() {
    if (this.AccessDetailsList.length != 0)
      //this.router.navigate(['course-pricing']); 
      this.router.navigate(['course-publish'], { queryParams: 
        { 
          categoryType: this.categoryType, 
          templateType: this.templateType,
          academyId: this.academyId,
          courseName: this.coursename
        } 
      });
    else
      this.toastr.warning("Please add atleast one Package.");
  }

  taxableItemChecked(e) {
    //console.log("Selected Tab:", e);
    this.receivedData.forEach(element => {
      element.lessonInfo.forEach(element2 => {
        if (e.target.id === element2.lessonId) {
          element2.isIncludeInPackage = e.target.checked;
          //element.lessonInfo.find(item => item._id == element2.lessonId).isIncludeInPackage = element2.isIncludeInPackage;
        }
      });
    });
    //console.log("Data:", this.receivedData);
  }

  onChange(e) {
    //console.log("Selected Tab:", e);
    this.receivedData.forEach(element => {
      element.lessonInfo.forEach(element2 => {
        if (e.target.id === element2.lessonId) {
          element2.scheduleTime = e.target.value;
          //element.lessonInfo.find(item => item._id == element2.lessonId).scheduleTime = element2.scheduleTime;
        }
      });
    });
    //console.log("Data:", this.receivedData);
  }

  onPackageChange(e) {
    this.loading = true;
    this.opacity = "opacity";
    var id = this.AccessDetailsList.find(item => item.name == e.target.value).id;
    this.auth.sendCourcePackageID(id);
    this.previewMoudles(id)
  }

  previewMoudles(id) {
    try {
      let params = {
        courseId: this.auth.getCourseId(),
        createAccessDetailId: id    
      }
      this.api.previewAccessLessonofPackage(params, this.auth.getToken()).subscribe(data => {
        console.log("preview Moudles: ",data);
        if (data.status){
          this.saveUpdateBtnTxt = "Update";
          this.receivedData = data.data;
        }

        this.loading = false;
        this.opacity = "";
        return;
      },
        err => {
          this.retrieveModuleLessonListing();
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

  SaveUpdatePackageInformation() {
      if(this.saveUpdateBtnTxt === "Save")
        this.SavePackageInformation();
      else
        this.UpdatePackageInformation();
  }
 
  SavePackageInformation(){
    try {
      let params = {
        courseId: this.auth.getCourseId(),
        courseAccessDetailsId: this.auth.getCourcePackageID(),
        accessData: this.receivedData
      } 
      console.log("Save Package Information:", params);     
      this.api.accessLessonofPackage(params, this.auth.getToken()).subscribe(response => {
        if (!response['status']) 
          this.toastr.warning(response['msg']);
        else {
          this.saveUpdateBtnTxt = "Update";
          this.accessDetails.accessLessonOfPackageID = response.data._id;
          this.AccessDetailsList.find(item => item == this.accessDetails).accessLessonOfPackageID = response.data._id;
          this.toastr.success(response['msg']);  
          console.log("Updated Access Details List:", this.AccessDetailsList);        
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

  UpdatePackageInformation(){
    try {
      let params = {
        courseId: this.auth.getCourseId(),
        accessData: this.receivedData,
        accessLessonOfPackageID: this.accessDetails.accessLessonOfPackageID
      }    
      //console.log("access Lesson Of PackageID: ", this.accessDetails);
      //console.log("Updated pack parameter:", params);
      
      this.api.updateTheAccessLessonOfPackage(params, this.auth.getToken()).subscribe(response => {
        if (!response['status']) 
          this.toastr.warning(response['msg']);
        else {
          this.saveUpdateBtnTxt = "Update";
          this.toastr.success(response['msg']);         
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

  onCoursePackageDelete() {
    if (confirm("Are you sure to delete?")) {
      this.loading = true;
      this.opacity = "opacity";
      let params = {
        courseId: this.auth.getCourseId(),
        createAccessDetailId: this.auth.getCourcePackageID()
      }
      this.api.deletePackage(params, this.auth.getToken()).subscribe(data => {
        if (data.status) {
          this.toastr.success("Package deleted successfully.");
          this.retrieveAccessDetailsofCourse();
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
}