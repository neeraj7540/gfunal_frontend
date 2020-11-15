import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funnel-import-contacts',
  templateUrl: './funnel-import-contacts.component.html',
  styleUrls: ['./funnel-import-contacts.component.css']
})
export class FunnelImportContactsComponent implements OnInit {

  public loading: boolean = false;
  public name: string = "";
  public token: string;
  public funnels: Array<any> = [];
  public funnelID: string = "";
  public params: any = {};

  public csvFileFormat: Array<string> = ["first_name", "last_name", "email_address",
    "phone", "country", "state", "pincode", "city", "Address_1", "Address_2"];

  constructor(
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private auth: AuthserviceService
  ) { }

  ngOnInit() {
    this.getFunnels();
  }

  public readFile(event: any): void {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let csv: string = reader.result.toString();
        // console.log(csv);

        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');

        headers.forEach((element) => {
          this.csvFileFormat = this.csvFileFormat.filter((element1) => {
            return element1 !== element;
          })
        });
        console.log(this.csvFileFormat);
        let lines = [];
        for (let i = 0; i < allTextLines.length; i++) {
          // split content based on comma  
          let data = allTextLines[i].split(',');

          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }
            // log each row to see output  
            // console.log(tarr);
            lines.push(tarr);
          }


        }
        // console.log(lines);
        this.tsvJSON(lines);
      }
    }
  }
  tsvJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }
    var json = JSON.stringify(objArray);
    // var str = json.replace(/},/g, "},\r\n");
    console.log(json); //JSON
    this.params.csvFilePath = json;
  }

  public getFunnels(): void {
    this.token = this.auth.getToken();
    this.api.getFunnels({}, this.token).subscribe(
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

  onUpload() {
    if (!this.params.funnelID)
      this.toastr.warning("Please select funnel.");
    else if (!this.params.csvFilePath)
      this.toastr.warning("Please select contacts file.");
    else {
      this.loading = true;
      this.api.importFunnelContacts(this.params, this.auth.getToken()).subscribe(data => {
        this.loading = false;
        if (data.status) {
          this.toastr.success(data.msg);
        }
        return;
      },
        err => {
          this.loading = false;
          console.log(err.msg);
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

}
