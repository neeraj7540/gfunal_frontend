import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-template-thumb',
  templateUrl: './course-template-thumb.component.html',
  styleUrls: ['./course-template-thumb.component.css']
})
export class CourseTemplateThumbComponent implements OnInit {

  @Input() temp_name;
  @Input() temp_type;

  public coursename: string;
  public params: any;
  public category: string;
  public academyId: string;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthserviceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.categoryType) 
          return this.router.navigate(['/dashboard']);

        this.category = data.categoryType
        this.academyId = data.academyId
      }
    )
  }

  public previewTemplate(): void {
    alert(this.temp_name)
  }

  customizeTemplate(): void {
    if (this.category == "Individual")
      this.router.navigate(['/create-course-details'], { queryParams: { categoryType: this.category, templateType: this.temp_type, academyId: this.academyId } });
    else
      this.router.navigate(['/create-subjects'], { queryParams: { categoryType: this.category, templateType: this.temp_type, academyId: this.academyId } });
  }
}
