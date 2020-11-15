import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-funnel-steps-categories',
  templateUrl: './funnel-steps-categories.component.html',
  styleUrls: ['./funnel-steps-categories.component.css']
})
export class FunnelStepsCategoriesComponent {

  @Output() selectedTab = new EventEmitter();
  public tab: string = "Optin";

  onTabClick(tabName: string) { // You can give any function name
    this.tab = tabName;
    this.selectedTab.emit(tabName);
  }

}
