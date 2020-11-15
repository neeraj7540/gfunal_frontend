import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-edit-lesson-add-video',
  templateUrl: './course-edit-lesson-add-video.component.html',
  styleUrls: ['./course-edit-lesson-add-video.component.css']
})
export class CourseEditLessonAddVideoComponent implements OnInit {

  @Input() selectedVideoFileName : string;
  fileData: File = null;
  @Input() videoTitle : string;
  @Input() videodescription : string;
  courseId : string;
  @Input() embendedVideoLink : string;
  public editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "150px",
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
    private router: Router,private activatedRout : ActivatedRoute) { }

    ngOnInit() {
      this.courseId = this.auth.getCourseId();
      if(!this.courseId)
      this.router.navigate(['/courselist']);
    }

    onFileUpload(event){
      if (event.target.files[0].type.startsWith("video")){
        console.log("Selected Video",event.target.files[0].type);
        this.selectedVideoFileName = event.target.files[0].name;
        this.fileData = event.target.files[0];
      }
      else
      this.toastr.warning('Please upload videos only.');
      }
  
      OnUpdateVideo_Click(){
        if(this.validation()){
          try{        
            let formData: FormData = new FormData(); 
            formData.append('lessonVideo', this.fileData);
            formData.append('lessonId', this.auth.getLessonId());
            formData.append('videoId', this.auth.getVideoId());
            formData.append('newTitle', this.videoTitle);
            formData.append('newvideodescription',this.videodescription);
            formData.append('embeddedLink', this.embendedVideoLink);
            formData.append('savedAs', "true");
  
            this.api.updateLessonVideo(formData,this.auth.getToken()).subscribe(response=>{
              if(!response['status'])
                this.toastr.warning(response['msg'])
              else{
                this.toastr.success(response['msg']);
                this.auth.sendVideoId(response.data._id);
              }
              return;
            },
            err=>{
              console.log(err);
              this.toastr.warning(err.error.msg)
            })
        }
        catch(err){
          console.log(err);
          this.toastr.warning("Please fill the requirements.")
        }
        }
      }
  
      onDelete_Clicked(){
  
        if(this.validation())
        {
          if(confirm("Are you sure to delete " + this.videoTitle)){
            try{
              let params={
                courseId: this.courseId,
                lessonId: this.auth.getLessonId(),
                moduleId: this.auth.getModuleId(),
                videoId : this.auth.getVideoId()
              }        
              this.api.deleteLessonVideo(params,this.auth.getToken()).subscribe(async(response)=>{
                if(!response['status'])
                  this.toastr.warning(response['msg']);            
                else{
                  this.toastr.success(response['msg']);
                  this.auth.sendVideoId("");
                  this.onSideBarClick.emit("addlessonvideo");
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
        if(!this.videoTitle){
          this.toastr.warning("Please enter video title.")
          return false;
         }
         if(!this.videodescription){
          this.toastr.warning("Please enter video description.")
          return false;
         }
         if(!this.embendedVideoLink && !this.fileData){
          this.toastr.warning("Please select a file.")
          return false;
         }
    
         return true;
      }

}
