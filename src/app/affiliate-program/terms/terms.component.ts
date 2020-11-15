import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/courseBuilder/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  name: string = this.auth.getUserName();
  isAccepted: boolean = false;
  data: any;
  type: string = "";
  affilateId: string = "";
  link: string = "";

  constructor(public auth: AuthserviceService, private toastr: ToastrService, private activatedRout: ActivatedRoute,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.checkValue();
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {
        this.type = value.type,
          this.affilateId = value.affilateId,
          this.link = value.link
      }
    )
  }

  OnCheck_Clicked(e) {
    this.isAccepted = e.checked ? true : false;
  }

  OnJoinProgram_Clicked() {
    if (this.isAccepted) {
      this.loading = true;
      this.opacity = "opacity";
      let params = {
        type: this.type,
        mainId: this.affilateId,
        link: this.link
      }
      this.api.createAffilation(params, this.auth.getToken()).subscribe(data => {
        console.log("create affiliate mod:", data);
        if (data.status) {
          this.router.navigate(['affiliate-dashboard'], { queryParams: { type: this.type, affilateId: this.affilateId, link: this.link } });
        }
        this.loading = false;
        this.opacity = "";
        return;
      },
        err => {
          this.loading = false;
          this.opacity = "";
          console.log(err)
          return
        }
      )
    }
    else
      this.toastr.warning("Please accept terms and conditions.");
  }
}