import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funnel-template-thumb',
  templateUrl: './funnel-template-thumb.component.html',
  styleUrls: ['./funnel-template-thumb.component.css']
})
export class FunnelTemplateThumbComponent implements OnInit {

  @Input() temp_name;


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.checkQueryIsAvailable()
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.blogCategory) {
          // return this.router.navigate(['/dashboard'])
        }
        return
      }
    )
  }

  public previewTemplate(): void {
    alert(this.temp_name)
  }

  onChoose() {
    this.router.navigate(["/funnel-optin-multiple-templates/steps/funnel-step-template"], { queryParams: { "funnelId": "fdsfdsf", "template": this.temp_name } })
  }

}
