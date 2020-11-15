import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-plan',
  templateUrl: './custom-plan.component.html',
  styleUrls: ['./custom-plan.component.css']
})
export class CustomPlanComponent implements OnInit {

  @Input() name:string;
  @Input() price:number;
  @Output() customCheckType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  CreatePackage_Selected(e) {
    //if(e.target.checked){        
      this.customCheckType.emit(e);
    //}
  }
}
