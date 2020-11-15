import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.css']
})
export class CourseReviewsComponent implements OnInit {

  opacity:string = "";
  loading: boolean=false;
  token:string;
  name:string = this.auth.getUserName();
  isPreviousDisabled : string = "disabled";
  isNextDisabled : string = "";
  maxNextClick : number = 0;
  startingValue : number = 0;
  lastValue : number = 10;
  flag : boolean = true;
  isDivVisible: boolean = false;
  receivedData:Array<any>=[];
  path: string;

  constructor(public auth: AuthserviceService,private toastr: ToastrService,
    public api: ApiServiceService,private router: Router,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
      this.opacity="opacity";
      this.retrieveReviews(this.startingValue, this.lastValue);
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public retrieveReviews(startingValue : number,lastValue : number):void{
    this.token = this.auth.getToken();
    let params = {
      startingValue : startingValue,            
      lastValue: lastValue,
      academyId: this.auth.getAcademyId()
    };    
    this.api.listOfRatingAndCommentAcademyWise(params).subscribe(data=>{
         if(data.status){
          var exceljsonobj = [];
           for (var v in data.data)
          {
            this.path = data.data[v].studentInformation.image !== null ? data.data[v].studentInformation.image.Location : "../assets/images/profile_user.png";
            var rating = (parseFloat(data.data[v].rating) * 100) / 5;
            exceljsonobj.push({
              "id": data.data[v]._id,
              "name": data.data[v].studentInformation.firstName,
              "rating": rating,
              "comment": data.data[v].comment,
              "createdAt": data.data[v].createdAt,
              "imagePath" : this.path
            });
          }
          this.receivedData = exceljsonobj;          
          this.isDivVisible = this.receivedData.length > 0 ? true : false;
          console.log("data: ", this.receivedData)
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
        return
      }
    )
  }

  onPaginaion_Clicked(data){
    if(data.target.textContent == "Next >>" && this.maxNextClick > -1){
      this.startingValue = this.lastValue;
      this.lastValue += 10; 
      this.loading=true;
      this.opacity="opacity";
      this.retrieveReviews(this.startingValue, this.lastValue);
      this.maxNextClick -= 1;
      this.isNextDisabled = this.maxNextClick > 0 ? "" : "disabled";
      this.isPreviousDisabled = "";
    }
    else if(data.target.textContent == "<< Previous" && this.isPreviousDisabled == ""){
      this.lastValue = this.startingValue;
      this.startingValue -= 10;
      this.loading=true;
      this.opacity="opacity";
      this.retrieveReviews(this.startingValue, this.lastValue);
      this.maxNextClick += 1;
      this.isPreviousDisabled = this.startingValue > 0 ? "" : "disabled";
      this.isNextDisabled = "";
    }
  }

}
