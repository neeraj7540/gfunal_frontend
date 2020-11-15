import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-funnel-sub-header',
  templateUrl: './funnel-sub-header.component.html',
  styleUrls: ['./funnel-sub-header.component.css']
})
export class FunnelSubHeaderComponent implements OnInit {

  public tab: string = "steps";
  @Output() selectedTab = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onTabSelect(tab: string) {
    console.log(tab);
    this.tab = tab;
    this.selectedTab.emit(tab);
  }
}
