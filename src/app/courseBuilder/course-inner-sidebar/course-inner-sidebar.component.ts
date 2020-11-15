import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-inner-sidebar',
  templateUrl: './course-inner-sidebar.component.html',
  styleUrls: ['./course-inner-sidebar.component.css']
})
export class CourseInnerSidebarComponent implements OnInit {

  @Input() dashboardCSS: string;
  @Input() announcementsCSS: string;
  @Input() studentsCSS: string;
  @Input() courseEngagementsCSS: string;
  @Input() reviewsCSS: string;
  @Input() coursesCSS: string;
  @Input() settingsCSS: string;
  name:string = this.auth.getUserName();

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthserviceService) { }

  ngOnInit() {
    this.commonCSS();
  }

  onClick(e) {
    switch (e.target.text) {
      case ' Dashboard': {
        this.commonCSS();
        this.router.navigate(['/course-builder-dashboard']);
        break;
      }
      case ' Announcements': {
        this.commonCSS();
        this.router.navigate(['/course-announcements']);
        break;
      }
      case ' Students': {
        this.commonCSS();
        this.router.navigate(['/course-students']);
        break;
      }
      case ' Course Engagements': {
        this.commonCSS();
        this.router.navigate(['/course-engagement']);
        break;
      }
      case ' Reviews': {
        this.commonCSS();
        this.router.navigate(['/course-reviews']);
        break;
      }
      case ' Courses': {
        this.commonCSS();
        this.router.navigate(['/courselist']);
        break;
      }
      case ' Settings': {
        this.commonCSS();
        this.router.navigate(['/course-settings']);
        break;
      }
      default: {
        break;
      }
    }
  }

  commonCSS(){
    if (this.dashboardCSS)
      this.announcementsCSS = this.studentsCSS = this.courseEngagementsCSS = this.reviewsCSS = this.coursesCSS = this.settingsCSS = "";
    else if (this.announcementsCSS)
      this.dashboardCSS = this.studentsCSS = this.courseEngagementsCSS = this.reviewsCSS = this.coursesCSS = this.settingsCSS = "";
    else if (this.studentsCSS)
      this.dashboardCSS = this.announcementsCSS = this.courseEngagementsCSS = this.reviewsCSS = this.coursesCSS = this.settingsCSS = "";
    else if (this.courseEngagementsCSS)
      this.dashboardCSS = this.announcementsCSS = this.studentsCSS = this.reviewsCSS = this.coursesCSS = this.settingsCSS = "";
    else if (this.reviewsCSS)
      this.dashboardCSS = this.announcementsCSS = this.courseEngagementsCSS = this.studentsCSS = this.coursesCSS = this.settingsCSS = "";
    else if (this.coursesCSS)
      this.dashboardCSS = this.announcementsCSS = this.courseEngagementsCSS = this.reviewsCSS = this.studentsCSS = this.settingsCSS = "";
    else if (this.settingsCSS)
      this.dashboardCSS = this.announcementsCSS = this.courseEngagementsCSS = this.reviewsCSS = this.coursesCSS = this.studentsCSS = "";
  }

}