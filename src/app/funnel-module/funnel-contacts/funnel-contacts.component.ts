import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funnel-contacts',
  templateUrl: './funnel-contacts.component.html',
  styleUrls: ['./funnel-contacts.component.css']
})
export class FunnelContactsComponent implements OnInit {


  name: string;
  public loading: boolean = false;
  public token: string;
  public funnelContacts: Array<any> = [];
  public filteredFunnelContacts: Array<any> = [];
  public funnels: Array<any> = [];
  public params: any;
  public selectedFunnel: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthserviceService

  ) { }

  ngOnInit() {
    this.loading = true;
    this.retriveContactList();
    this.getFunnels();
    this.getProfile(this.auth.getToken());
  }


  getProfile(token: string) {
    console.log("its called")
    this.api.getProfile(token).subscribe(
      data => {
        console.log("data is ", data)
        this.name = data["data"]["first_name"] + " " + data["data"]["last_name"];
        this.auth.sendUserName(this.name);
      },
      err => {
        console.log("err is", err)
      }
    )
  }


  public getFunnels(): void {
    this.token = this.auth.getToken()
    this.params = {};

    this.api.getFunnels(this.params, this.token).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.funnels = data.data.data;
          return
        }
        return
      },
      err => {
        console.log(err)
        this.loading = false;
        return
      }
    )
  }

  public retriveContactList(): void {
    this.token = this.auth.getToken()
    this.params = {
      "startingValue": 0,
      "lastValue": 100
    }

    this.api.funnelContactList(this.params, this.token).subscribe(
      data => {
        this.loading = false;
        if (data.status) {
          this.loading = false;
          this.funnelContacts = data.data.data;
          this.filteredFunnelContacts = data.data.data;

          return
        }
        return
      },
      err => {
        console.log(err)
        this.loading = false;
        return
      }
    )
  }

  onDeleteContact(item, index) {
    if (confirm("Are you sure to delete " + item.cont_firstname + " " + item.cont_lastname)) {
      this.loading = true;
      var params = { "contactID": item._id };
      this.api.deleteFunnelContact(params, this.token).subscribe(data => {
        this.loading = false;
        if (data.status) {
          this.funnelContacts.splice(index, 1);
        }
        return;
      },
        err => {
          this.loading = false;
          console.log(err);
          return;
        }
      )
    }
  }
  public check(): boolean {
    if (this.loading) {
      return true
    }
    else {
      return false
    }
  }

  goCreateContact() {
    this.router.navigate(['/funnel-create-contact']);
  }


  onSelectFunnel() {
    this.funnelContacts = this.filteredFunnelContacts.filter(t => t.funnel_id === this.selectedFunnel);
  }
}
