import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css']
})
export class ViewSubjectsComponent implements OnInit {
  
  name: string = this.auth.getUserName();
  category: string;
  templateType : string;
  academyId: string;
  loading: any;
  opacity: string = "";
  itemsArray: Array<any> = [];

  constructor(private router: Router,private activeRoute: ActivatedRoute,private api: ApiServiceService,private auth: AuthserviceService,
    private toastr: ToastrService) { }
  ngOnInit() {
    this.checkQueryIsAvailable();
    this.loading = true;
    this.opacity = "opacity";
    //if (this.auth.getIntialInformationID() != "")
      this.retrieveListingSubjects();
  }

  public check(): boolean {
    if (this.loading) 
      return true
    else 
      return false
  }

  public checkQueryIsAvailable() : void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.categoryType) 
          return this.router.navigate(['/dashboard'])
        
        this.category = data.categoryType;
        this.templateType = data.templateType;
        this.academyId = data.academyId;        
      }
    )
  }

  private retrieveListingSubjects(): void {
    //var IntialInformationIDArray = this.auth.getIntialInformationID().split(';');    
    this.api.previewIntialInformation({ "templateType": this.templateType.toLowerCase(), "category": this.category.toLowerCase(), "academyId": this.academyId }, this.auth.getToken()).subscribe(data => {            
      if (data.status) {
        this.itemsArray = data.data;
        // for (var v in data.data) {
        //   for (var d in data.data[v].teach_SubjectAndClass) {
        //     data.data[v].teach_SubjectAndClass[d].subjects.forEach(element => {
        //       this.itemsArray.push({
        //         "id": element._id,
        //         "name": data.data[v].teach_SubjectAndClass[d].class + ' ' + element.name,
        //         "classId" : data.data[v].teach_SubjectAndClass[d]._id,
        //         "intialInformationId": data.data[v]._id
        //       });
        //     });
        //   }
        // }
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

  onSelectCategory(e){
    this.router.navigate(['/create-course-details'], 
    { queryParams: 
      { 
        categoryType: this.category, 
        templateType: this.templateType,
        subjectId: e._id,
        academyId: this.academyId,
        courseName:e.courseName
      } 
    });
  }

  // onDeleteCategory(e){
  //   if (confirm("Are you sure to delete " + e.name)) {
  //     try {
  //       let params = {
  //         intialInformationId : e.intialInformationId,
  //         classId: e.classId,
  //         subjectId: e.id
  //       }
  //       this.api.removeTheSubject(params, this.auth.getToken()).subscribe(async (response) => {
  //         if (!response['status']) 
  //           this.toastr.warning(response['msg']);
  //         else {
  //           this.toastr.success(response['msg']);
  //           this.itemsArray = [];
  //           this.retrieveListingSubjects();
  //         }
  //         return;
  //       },
  //         err => {
  //           console.log(err)
  //           this.toastr.warning(err.error.msg)
  //         })
  //     }
  //     catch (err) {
  //       console.log(err)
  //       this.toastr.warning("Please fill the requirements.")
  //     }
  //   }
  // }

  onDeleteCategory(deletedItem) {
    if (confirm("Are you sure to delete course: " + deletedItem.courseName)) {
      this.loading = true;
      this.opacity = "opacity";
      this.api.deleteCourse({ "courseId": deletedItem._id }, this.auth.getToken()).subscribe(data => {
        if (data.status) {
          this.toastr.success(data['msg']);
          this.retrieveListingSubjects();
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