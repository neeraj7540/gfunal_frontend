import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-sub-header',
  templateUrl: './course-sub-header.component.html',
  styleUrls: ['./course-sub-header.component.css']
})
export class CourseSubHeaderComponent implements OnInit {

  @Input() nextPhase: string = "";
  @Input() isAccessLevelSelected: string = "";
  @Input() isCurriculumSelected: string = "";
  //@Input() isPricingSelected: string = "";
  @Input() isPublishSelected: string = "";
  isDivVisible : boolean = true;

  @Input() categoryType: string;
  @Input() templateType: string;
  @Input() coursename: string;
  @Input() academyId: string;

  url : string = this.auth.getAcademyUrl();

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router) { }

  ngOnInit() {
    if (this.isAccessLevelSelected){
      //this.isCurriculumSelected = this.isPricingSelected = this.isPublishSelected = "";
      this.isCurriculumSelected = this.isPublishSelected = "";
      this.isDivVisible = false;
    }
    // else if (this.isPricingSelected){
    //   this.isCurriculumSelected = this.isPublishSelected = this.isAccessLevelSelected = "";
    //   this.isDivVisible = false;
    // }
    else if (this.isPublishSelected){
      //this.isCurriculumSelected = this.isPricingSelected = this.isAccessLevelSelected = "";
      this.isCurriculumSelected = this.isAccessLevelSelected = "";
      this.isDivVisible = false;
    }
  }

  onNextPhase_Click() {
    switch (this.nextPhase) {
      case "ACCESS LEVEL":
        this.router.navigate(['course-access-levels'],{ queryParams: 
          { 
            categoryType: this.categoryType, 
            templateType: this.templateType,
            academyId: this.academyId,
            courseName: this.coursename
          } 
        });
        break;
    }
  }

}