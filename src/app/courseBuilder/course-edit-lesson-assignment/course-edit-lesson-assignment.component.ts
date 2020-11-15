import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-course-edit-lesson-assignment',
  templateUrl: './course-edit-lesson-assignment.component.html',
  styleUrls: ['./course-edit-lesson-assignment.component.css']
})
export class CourseEditLessonAssignmentComponent implements OnInit {

  courseId : string;
  @Input() addPostParam: any = {};
  public editorConfig: any = {
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

  @Output() onSideBarClick = new EventEmitter();

  constructor(private toastr: ToastrService, public api: ApiServiceService,private auth: AuthserviceService,
    private router: Router,private activatedRout : ActivatedRoute)  { }

  ngOnInit() {
    this.courseId = this.auth.getCourseId();
    if(!this.courseId)
    this.router.navigate(['/courselist']);
  }

  OnUpdateAssignment_Click(){
    if(this.validation()){
      try{
        let param = {
          lessonId: this.auth.getLessonId(),
          assignmentId : this.auth.getAssignmentId(),
          newTitle : this.addPostParam.assignmentTitle,
          newContent : this.addPostParam.AssignmentContent,
          newSavedAs: true
        };
        this.api.updateLessonAssignmnet(param,this.auth.getToken()).subscribe(response=>{
          if(!response['status'])
            this.toastr.warning(response['msg'])
          else{
            this.toastr.success(response['msg']);
            this.auth.sendAssignmentId(response.data._id);            
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

  onDelete_Clicked(){

    if(this.validation())
    {
      if(confirm("Are you sure to delete " + this.addPostParam.assignmentTitle)){
        try{
          let params={
            courseId: this.courseId,
            lessonId: this.auth.getLessonId(),
            moduleId: this.auth.getModuleId(),
            AssignmentId : this.auth.getAssignmentId()
          }        
          this.api.deleteLessonAssignment(params,this.auth.getToken()).subscribe(async(response)=>{
            if(!response['status'])
              this.toastr.warning(response['msg']);            
            else{
              this.toastr.success(response['msg']);
              this.auth.sendAssignmentId(""); 
              this.onSideBarClick.emit("addlessonassignment");
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
  }

  validation() : boolean{      
    if(!this.addPostParam.assignmentTitle){
      this.toastr.warning("Please enter assignment title.")
      return false;
     }
     if(!this.addPostParam.AssignmentContent){
      this.toastr.warning("Please add some content.")
      return false;
     }

     return true;
  }

}
