import { Component, OnInit } from '@angular/core';
import grapesjs from 'grapesjs'
import "grapesjs-blocks-basic"
import "grapesjs-preset-newsletter"
import "grapesjs-preset-webpage"
import Data from '../../css'
import { ApiService } from '../api.service'
import { AuthserviceService } from '../authservice.service'
import { Template } from '../template'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {

  public token: string = this.auth.getToken();
  public loading: boolean = false;
  public opacity: string = "";
  public template_id: string = "";
  public site_name: string = "";
  public landingPageId: string = "";
  public calling: string = "";
  public params: any;
  constructor(private auth: AuthserviceService, private api: ApiService, private route: Router, private toast: ToastrService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkQueryParams()

    if (!this.auth.getPackageCheck())
    this.route.navigate(['/dashboard'])

    if(this.calling){
      this.updateDraftTemplate();
    }
    else{
      if (this.landingPageId)
      this.draftTemplate();
    else
      this.saveTemplate();
    }
  }

  public checkQueryParams() {
    this.activateRoute.queryParams.subscribe(
      data => {
        this.template_id = data.template_id;
        this.site_name = data.site_name;
        this.landingPageId = data.landingPageId;
        this.calling = data.calling;
      }
    )
  }

  draftTemplate() {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: 1,
      storageManager: {
        type: 'remote',
        autosave: false,
        urlStore: 'https://gfunlbackend.herokuapp.com',
        urlLoad: 'https://gfunlbackend.herokuapp.com',
        contentTypeJson: true
      },
      plugins: ['gjs-blocks-basic'],
    });

    editor.Panels.addButton('options',
      [{
        id: 'draft-db',
        className: 'fa-floppy-o',
        command: 'draft-db',
        attributes: { title: 'Draft DB' }
      }])

    editor.Commands.add('draft-db', {
      run: (editor, sender) => {
        sender && sender.set('active');
        editor.store();
        var htmlData = editor.getHtml();
        var cssData = editor.getCss();
        console.log("Html Data", htmlData);
        this.postDraftData({
          html: htmlData,
          css: cssData,
          landing_page_title: this.site_name,
          landingPageID: this.landingPageId
        }, this.token)
      }
    })
    editor.on('load',
      () => {
        this.checkDataisAvailable(editor)
      })
  }

  saveTemplate() {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: 1,
      storageManager: {
        type: 'remote',
        autosave: false,
        urlStore: 'https://gfunlbackend.herokuapp.com',
        urlLoad: 'https://gfunlbackend.herokuapp.com',
        contentTypeJson: true
      },
      plugins: ['gjs-blocks-basic'],
    });

    editor.Panels.addButton('options',
      [{
        id: 'save-db',
        className: 'fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save DB' }
      }])

    editor.Commands.add('save-db', {
      run: (editor, sender) => {
        sender && sender.set('active');
        editor.store();
        var htmlData = editor.getHtml();
        var cssData = editor.getCss();
        this.postData({
          html: htmlData,
          css: cssData,
          site_name: this.site_name
        }, this.token)
        // alert('Draft')
      }
    })
    editor.on('load',
      () => {
        this.checkDataisAvailable(editor)
      })
  }

  public postData(data: any, token: string) {
    this.loading = true;
    this.opacity = 'opacity';
    console.log("saving data params are", data)
    try {
      this.api.postHtmlCss(data, token).subscribe(
        (data) => {
          this.loading = false;
          this.opacity = ''
          console.log(data)
          if (data["status"]) {
            this.toast.success(data.msg);
            this.route.navigate(['/lp-lists']);
          }
          else {
            this.toast.warning("Something went wrong")
          }
        },
        (err) => {
          this.loading = false;
          this.opacity = ''
          this.toast.warning("Something went wrong")
          // console.log(err)
        }
      )
    }
    catch (err) {
      this.loading = false;
      this.opacity = ''
      this.toast.warning("Something went wrong")
    }
  }

  public postDraftData(data: any, token: string) {
    this.loading = true;
    this.opacity = 'opacity';
    try {
      this.api.createNewThemeofLandingpage(data, token).subscribe(
        (data) => {
          this.loading = false;
          this.opacity = ''
          if (data["status"]) {
            this.toast.success(data.msg);
            this.route.navigate(['/saved-landing-page'], { queryParams: { landdingPageID: this.landingPageId } });
          }
          else {
            this.toast.warning("Something went wrong")
          }
        },
        (err) => {
          this.loading = false;
          this.opacity = ''
          this.toast.warning("Something went wrong")
        }
      )
    }
    catch (err) {
      this.loading = false;
      this.opacity = ''
      this.toast.warning("Something went wrong")
    }
  }

  public checkDataisAvailable(editor) {
    this.loading = true;
    this.opacity = 'opacity';
    this.params = {
      template_id: this.template_id
    }
    console.log("preview params are", this.params)
    try {
      this.api.checkData(this.params, "/template/previewDraftedTheme").subscribe(
        data => {
          console.log("data of preview is", data)
          try {
            this.loading = false;
            this.opacity = '';
            if (data.status) {
              if (data.data.html)
                editor.addComponents('<style>' + data.data.css + '</style>' + data.data.html)
              else
                editor.addComponents('<style>' + Data['css'] + '</style>' + Data['html'])
            }
            else
              editor.addComponents('<style>' + Data['css'] + '</style>' + Data['html'])
          }
          catch (err) {
            editor.addComponents('<style>' + Data['css'] + '</style>' + Data['html'])
          }
        },
        err => {
          console.log("err is", err)
          this.loading = false;
          this.opacity = ''
          editor.addComponents('<style>' + Data['css'] + '</style>' + Data['html'])
        }
      )
    }
    catch (err) {
      editor.addComponents('<style>' + Data['css'] + '</style>' + Data['html'])
      this.loading = false;
      this.opacity = ''
    }
  }

  public check(): boolean {
    if (this.loading)
      return true
    else
      return false
  }

  updateDraftTemplate() {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: 1,
      storageManager: {
        type: 'remote',
        autosave: false,
        urlStore: 'https://gfunlbackend.herokuapp.com',
        urlLoad: 'https://gfunlbackend.herokuapp.com',
        contentTypeJson: true
      },
      plugins: ['gjs-blocks-basic'],
    });

    editor.Panels.addButton('options',
      [{
        id: 'update-db',
        className: 'fa-floppy-o',
        command: 'update-db',
        attributes: { title: 'Update DB' }
      }])

    editor.Commands.add('update-db', {
      run: (editor, sender) => {
        sender && sender.set('active');
        editor.store();
        var htmlData = editor.getHtml();
        var cssData = editor.getCss();
        this.postUpdatedData({
          html: htmlData,
          css: cssData,
          template_id: this.template_id,
          savedAs : false
        }, this.token)
      }
    })
    editor.on('load',
      () => {
        this.checkDataisAvailable(editor)
      })
  }

  public postUpdatedData(data: any, token: string) {
    this.loading = true;
    this.opacity = 'opacity';
    console.log("updated data params are", data)
    try {
      this.api.updateNewThemeofLandingPage(data, token).subscribe(
        (data) => {
          this.loading = false;
          this.opacity = ''
          console.log(data)
          if (data["status"]) {
            this.toast.success(data.msg);
            this.route.navigate(['/saved-landing-page'], { queryParams: { landdingPageID: this.landingPageId } });
          }
          else {
            this.toast.warning("Something went wrong")
          }
        },
        (err) => {
          this.loading = false;
          this.opacity = ''
          this.toast.warning("Something went wrong")
          // console.log(err)
        }
      )
    }
    catch (err) {
      this.loading = false;
      this.opacity = ''
      this.toast.warning("Something went wrong")
    }
  }

}
