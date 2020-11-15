import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-course-compose-announcements',
  templateUrl: './course-compose-announcements.component.html',
  styleUrls: ['./course-compose-announcements.component.css']
})
export class CourseComposeAnnouncementsComponent implements OnInit {

  opacity: string = "";
  loading: boolean = false;
  token: string;
  receivedData: Array<any> = [];
  name: string = this.auth.getUserName();
  toppings = new FormControl();
  addPostParam: any = {};
  editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "300px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink"]
    ]
  };

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.opacity = "opacity";
    this.retrieveCourses();

    // for (let i = 1; i < 4; i++) {
    //   this.receivedData.push({
    //     "id": i,
    //     "name": "Item" + i
    //   });
    // }
  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public retrieveCourses(): void {
    this.token = this.auth.getToken();
    this.api.courseList({ "startingValue": 0, "lastValue": 100, "academyId": this.auth.getAcademyId() }, this.token).subscribe(data => {
      console.log("Courses List:", data);
      if (data.status) {
        var exceljsonobj = [];
        for (var v in data.data) {
          if (data.data[v].publish) {
            exceljsonobj.push({
              "id": data.data[v]._id,
              "name": data.data[v].courseName
            });
          }
        }

        this.receivedData = exceljsonobj;
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

  OnSend_Clicked() {
    var obj = [];
    this.toppings.value.forEach(element => {
      this.receivedData.forEach(data => {
        if (element === data.name)
          obj.push(data.id);
      });
    });

    if(this.validation()){
      try{
        let param = {
          academyId: this.auth.getAcademyId(),
          coursesArray: obj,
          title:this.addPostParam.title,
          announcement:this.addPostParam.announcement
        };

        console.log("Send Parameters:", param);
        this.api.addAnnouncement(param,this.auth.getToken()).subscribe(response=>{
          if(!response['status'])
            this.toastr.warning(response['msg'])
          else{
            this.toastr.success(response['msg']);
            this.toppings = new FormControl();
            this.addPostParam = {};          
          }
          return;
        },
        err=>{
          console.log(err)
          this.toastr.warning(err.error.msg)
        })
    }
    catch(err){
      console.log(err)
      this.toastr.warning("Please fill the requirements.")
    }
    }
  }

  validation() : boolean{    
    if(!this.toppings.value){
      this.toastr.warning("Please select atleast one course.")
      return false;
     }  
    if(!this.addPostParam.title){
      this.toastr.warning("Please enter title.")
      return false;
     }
     if(!this.addPostParam.announcement){
      this.toastr.warning("Please add some content.")
      return false;
     }

     return true;
  }
}