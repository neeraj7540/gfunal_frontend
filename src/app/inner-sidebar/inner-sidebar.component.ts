import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-inner-sidebar',
  templateUrl: './inner-sidebar.component.html',
  styleUrls: ['./inner-sidebar.component.css']
})
export class InnerSidebarComponent implements OnInit {

  @Input() dashboardCSS: string = "";
  @Input() contactsCSS: string = "";
  @Input() domainsCSS: string = "";
  @Input() landingPagesCSS: string = "";
  @Input() leadsCSS: string = "";
  @Input() invoicesCSS: string = "";
  @Input() landdingPageID: string = "";
  name: string = this.auth.getUserName();

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthserviceService) { }

  ngOnInit() {
    this.commonCSS();
  }

  onClick(e) {
    switch (e.target.text) {
      case ' Dashboard': {
        this.dashboardCSS = "active";
        this.commonCSS();
        this.router.navigate(['/lp-dashboard'], { queryParams: { landdingPageID: this.landdingPageID } });
        break;
      }
      case ' Contacts': {
        this.contactsCSS = 'active';
        this.commonCSS();
        this.router.navigate(['/' + e.target.text.toLowerCase().trim()], { queryParams: { landdingPageID: this.landdingPageID } });
        // this.router.navigate(['/funnel-contacts']);
        // this
        break;
      }
      case ' Domains': {
        this.domainsCSS = 'active';
        this.commonCSS();
        this.router.navigate(['/' + e.target.text.toLowerCase().trim()], { queryParams: { landdingPageID: this.landdingPageID } });
        break;
      }
      case ' Landing pages': {
        this.landingPagesCSS = 'active';
        this.commonCSS();
        this.router.navigate(['/saved-landing-page'], { queryParams: { landdingPageID: this.landdingPageID } });
        break;
      }
      case ' Leads': {
        this.leadsCSS = 'active';
        this.commonCSS();
        this.router.navigate(['/' + e.target.text.toLowerCase().trim()], { queryParams: { landdingPageID: this.landdingPageID } });
        break;
      }
      case ' Invoices': {
        this.invoicesCSS = 'active';
        this.commonCSS();
        this.router.navigate(['/invoice-list'], { queryParams: { landdingPageID: this.landdingPageID } });
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  commonCSS(){
    if (this.dashboardCSS)
      this.contactsCSS = this.domainsCSS = this.landingPagesCSS = this.leadsCSS = this.invoicesCSS = "";
    else if (this.contactsCSS)
      this.dashboardCSS = this.domainsCSS = this.landingPagesCSS = this.leadsCSS = this.invoicesCSS = "";
    else if (this.domainsCSS)
      this.dashboardCSS = this.contactsCSS = this.landingPagesCSS = this.leadsCSS = this.invoicesCSS = "";
    else if (this.landingPagesCSS)
      this.dashboardCSS = this.contactsCSS = this.domainsCSS = this.leadsCSS = this.invoicesCSS = "";
    else if (this.leadsCSS)
      this.dashboardCSS = this.contactsCSS = this.domainsCSS = this.landingPagesCSS = this.invoicesCSS = "";
    else if (this.invoicesCSS)
      this.dashboardCSS = this.contactsCSS = this.domainsCSS = this.leadsCSS = this.landingPagesCSS = "";
  }
}