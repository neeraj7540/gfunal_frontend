import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funnel-users',
  templateUrl: './funnel-users.component.html',
  styleUrls: ['./funnel-users.component.css']
})
export class FunnelUsersComponent implements OnInit {

  public receivedData: Array<any>;
  name:string = "";
  constructor() { }

  ngOnInit() {
  }

  check(){
    
  }

}
