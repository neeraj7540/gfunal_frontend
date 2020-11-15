import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-create-subjects',
  templateUrl: './create-subjects.component.html',
  styleUrls: ['./create-subjects.component.css']
})
export class CreateSubjectsComponent implements OnInit {

  name: string = this.auth.getUserName();
  opacity: string = "";
  loading: boolean = false;
  classname: string = "";
  itemsArray: Array<any> = [];
  data: any;
  categoryType: string;
  templateType: string;
  academyId: string;
  IntialInformationID: Array<any> = [];

  variant: any = [];

  constructor(private toastr: ToastrService, public api: ApiServiceService, private auth: AuthserviceService,
    private router: Router, private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.checkValue();
    console.log("Intial Ids: ", this.auth.getIntialInformationID());
    if (this.auth.getIntialInformationID() !== "" && this.auth.getIntialInformationID()) {
      this.loading = true;
      this.opacity = "opacity";
      this.retrieveListingSubjects();
    }
  }

  public checkValue(): void {
    this.data = this.activatedRout.queryParams.subscribe(value => {

      if (!value.categoryType)
        return this.router.navigate(['/dashboard'])

      this.categoryType = value.categoryType;
      this.templateType = value.templateType;
      this.academyId = value.academyId;
    }
    )
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  private retrieveListingSubjects(): void {
    var IntialInformationIDArray = this.auth.getIntialInformationID().split(';');
    this.IntialInformationID = IntialInformationIDArray;
    this.api.previewIntialInformation({ "intialInformationId": IntialInformationIDArray, "templateType": this.templateType }, this.auth.getToken()).subscribe(data => {
      if (data.status) {
        for (var v in data.data) {
          for (var d in data.data[v].teach_SubjectAndClass) {
            var data2 = "";
            var subjectsArray = [];
            data.data[v].teach_SubjectAndClass[d].subjects.forEach(element => {
              data2 += element.name + '; ';
              subjectsArray.push({
                "name": element.name
              });
            });
            this.itemsArray.push({
              "classname": data.data[v].teach_SubjectAndClass[d].class,
              "subjects": data2
            });
          }
        }
      }
      this.loading = false;
      this.opacity = "";
      return;
    },
      err => {
        this.loading = false;
        this.opacity = "";
        console.log(err)
        return;
      }
    )
  }

  onAddSubject_Clicked() {
    if (this.validateData()) {
      this.loading = true;
      this.opacity = "opacity";
      var data = "";
      var subjectsArray = [];
      this.variant.forEach(element => {
        data += element.value + '; ';
        subjectsArray.push({
          "name": element.value
        });
      });
      this.itemsArray.push({
        "classname": this.classname,
        "subjects": data
      });

      try {

        let param = {
          typeOfCourse: this.categoryType,
          teach_SubjectAndClass: {
            "class": this.classname,
            "subjects": subjectsArray
          },
          templateType: this.templateType,
          academyId:this.academyId
        };

        this.api.addIntialInformation(param, this.auth.getToken()).subscribe(response => {
          if (!response['status'])
            this.toastr.warning(response['msg'])
          else {
            this.toastr.success('Data saved successfully.');
            this.classname = ""; this.variant = [];
            this.IntialInformationID.push(response.data._id);
            this.auth.sendIntialInformationID(this.IntialInformationID.map(x => x).join(";"));
          }
          this.loading = false;
          this.opacity = "";
          return;
        },
          err => {
            console.log(err)
            this.toastr.warning(err.error.msg)
          })
      }
      catch (err) {
        console.log(err)
        this.toastr.warning("Please fill the requirements.")
      }

    }
  }

  validateData(): boolean {
    if (!this.classname) {
      this.toastr.warning("Please enter class.")
      return false;
    }
    else if (!this.variant.length) {
      this.toastr.warning("Please enter subjects.")
      return false;
    }
    return true;
  }

  onSave_Clicked() {
    console.log("array length:", this.itemsArray.length);
    if (this.itemsArray.length >= 1)
      this.router.navigate(['/view-subjects'], { queryParams: { categoryType: this.categoryType, templateType: this.templateType, academyId: this.academyId } });
    else
      this.toastr.warning("Please add atleast one subject.")
  }
}
