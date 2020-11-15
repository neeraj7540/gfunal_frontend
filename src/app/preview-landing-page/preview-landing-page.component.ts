import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-landing-page',
  templateUrl: './preview-landing-page.component.html',
  styleUrls: ['./preview-landing-page.component.css']
})
export class PreviewLandingPageComponent implements OnInit {

  public template_id: string;
  public callingMethod: string;
  public endPoint: string;
  public site_name: string;
  public params: any;
  public css: string;
  public html: string
  public styles: SafeHtml;
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.previewPage()
  }

  public previewPage(): void {

    this.activatedRoute.queryParams.subscribe(data => {
        this.template_id = data.template_id;
        this.callingMethod = data.callingMethod;
      }
    )

    if (this.callingMethod == "preview")
      this.endPoint = "/template/preview";
    else
      this.endPoint = "/template/previewDraftedTheme";

    this.params = {
      template_id: this.template_id
    }

    this.api.checkData(this.params, this.endPoint).subscribe(data => {
      console.log("Check data", data)
      if (data.status) {
        this.html = data.data.html
        this.css = data.data.css
        this.styles = this.sanitizer.bypassSecurityTrustHtml(`
          <style>
            ${this.css}
          </style>
          `)
      }
      console.log("css is", this.css)
    },
      err => {
        console.log("error is", err)
      }
    )
  }
}