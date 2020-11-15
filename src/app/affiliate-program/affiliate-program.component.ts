import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "../authservice.service";
import { ToastrService } from "ngx-toastr";
import { ApiServiceService } from "../courseBuilder/api-service.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-affiliate-program",
  templateUrl: "./affiliate-program.component.html",
  styleUrls: ["./affiliate-program.component.css"],
})
export class AffiliateProgramComponent implements OnInit {
  //no use for this comment
  name: string = this.auth.getUserName();

  constructor(
    public auth: AuthserviceService,
    private toastr: ToastrService,
    public api: ApiServiceService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}
}
