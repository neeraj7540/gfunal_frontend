import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  opacity:string = "";
  loading: boolean=false;
  receivedData: Array<any> = [];
  name:string = this.auth.getUserName();
  isDivVisible : boolean = false;
  isPreviousDisabled : string = "disabled";
  isNextDisabled : string = "";
  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retrieveStudentData(this.startingValue, this.lastValue);
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  private retrieveStudentData(startingValue : number,lastValue : number ) : void{
    let params = {
      startingValue : startingValue,            
      lastValue: lastValue,
      academyId: this.auth.getAcademyId()
    }; 
    this.api.listOfStudent(params).subscribe(data=>{
        if(data.status){
          // var exceljsonobj = [];
          // for (var v in data.data) {
          //   exceljsonobj.push({
          //     "name": data.data[v].userInformation.firstName
          //   });
          // }

          this.receivedData = data.data;
          this.isDivVisible = this.receivedData.length > 0 ? true : false;
          if(this.flag){
            this.flag = false;
            this.maxNextClick = Math.floor(data.count / 10);
            this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
          }
        }
        this.loading=false;
        this.opacity="";
        return;
      },
      err=>{
        this.loading=false;
        this.opacity="";
        console.log(err)
        return;
      }
    )
  }

  onPaginaion_Clicked(data){
    if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
      this.startingValue = this.lastValue;
      this.lastValue += 10; 
      this.loading=true;
      this.opacity="opacity";
      this.retrieveStudentData(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrieveStudentData(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }

}
