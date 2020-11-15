import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-landingimportcontacts',
  templateUrl: './landingimportcontacts.component.html',
  styleUrls: ['./landingimportcontacts.component.css']
})
export class LandingimportcontactsComponent implements OnInit {

  public loading: boolean = false;
  public token: string;
  public landings: Array<any> = [];
  public landdingPageID: string = "";
  public params: any = {};
  public data: any;
  name:string = this.auth.getUserName();
  public csvFileFormat: Array<string> = ["first_name", "last_name", "email_address",
    "phone", "Address_1", "Address_2", "country", "state", "pincode"];

  constructor(private router: Router, private api: ApiService, private toastr: ToastrService, private auth: AuthserviceService,
    private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(
      value => {
        this.landdingPageID = value.landdingPageID

        if (!this.landdingPageID)
          this.router.navigate(['/lp-lists']);
      }
    )
  }

  public check(): boolean {
    if (this.loading)
      return true
    else
      return false
  }

  public readFile(event: any): void {
    console.log(event);
    debugger;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let csv: string = reader.result.toString();

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
          let data = allTextLines[i].split(',');

          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }
            lines.push(tarr);
          }
        }
        this.tsvJSON(lines);
      }
    }
  }

  tsvJSON(array) {
    debugger;
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
    //console.log(json); //JSON
    this.params.csvFilePath = json;
    // console.log("Parameter data: ",this.params.csvFilePath );
    // var data = JSON.parse(this.params.csvFilePath);
    // data.forEach(element => {
    //   console.log("Parameter data Ites: ",element );
    // });

  }

  onUpload() {
    debugger;
    if (!this.params.csvFilePath)
      this.toastr.warning("Please select contacts file.");
    else {
      this.loading = true;
      var data = JSON.parse(this.params.csvFilePath);
      const newListingData = data.map(current => ({
        ...current,
        "site_name" : this.auth.getSiteName(),
        "template_id" : this.landdingPageID
      }));
       console.log("Updated data:", newListingData);
      // this.loading = false;
      // return;
      this.api.importContactLandingPage(newListingData, this.auth.getToken()).subscribe(data => {
        console.log("Response data:", data);
        if (data.status) 
          this.toastr.success(data.msg);
        
        this.loading = false;
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
}