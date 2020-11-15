import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.css']
})
export class AccordionGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * If the panel is opened or closed
   */
  @Input() opened = false;

  /**
   * Text to display in the group title bar
   */
  @Input() title: string;

  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

}
