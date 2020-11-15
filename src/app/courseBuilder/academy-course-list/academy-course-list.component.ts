import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academy-course-list',
  templateUrl: './academy-course-list.component.html',
  styleUrls: ['./academy-course-list.component.css']
})
export class AcademyCourseListComponent implements OnInit {

  loopArray: any[] = [];
  constructor() { }

  ngOnInit() {
    for (let i = 1; i < 4; i++) {
      this.loopArray.push(i.toString());
    }
  }

}
