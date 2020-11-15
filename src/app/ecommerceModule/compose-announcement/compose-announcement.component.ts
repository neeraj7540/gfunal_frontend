import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-compose-announcement',
  templateUrl: './compose-announcement.component.html',
  styleUrls: ['./compose-announcement.component.css']
})
export class ComposeAnnouncementComponent implements OnInit {

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
  private shopID: string;

  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    public api: ApiService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = false;
    this.opacity = "opacity";
    this.checkQueryIsAvailable();
  }

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        return
      }
    )
  }

  public check(): boolean {
    return this.loading ? true : false;
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
          ecommerceSiteId: this.shopID,
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
