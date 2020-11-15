import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-single-plan',
  templateUrl: './single-plan.component.html',
  styleUrls: ['./single-plan.component.css']
})
export class SinglePlanComponent implements OnInit {
  @Input() datais:string;
  @Input() text_class:string;
  @Input() price:string;
  @Input() selected:string;
  @Output() checkType = new EventEmitter();
  @Input() packagecss:string;
  @Input() isCheckBoxChecked:boolean;

  package_name:string=name
  constructor() { }

  ngOnInit() {
    console.log("name is" +name)
  }

  Package_Selected(e) {
    debugger;
    if(e.target.checked){   
      console.log("Checked clicked!!");     
      this.checkType.emit(e);
    }
 }
}
