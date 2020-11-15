import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseDataService {

  // public selectedCourseData: any;
  // public selectedLessonData: any;

  constructor() { }

  saveSelectedCourseData(courseData: any) {
    localStorage.setItem("selectedCourseData", JSON.stringify(courseData));
  }
  saveSelectedLessonData(lessonData: any) {
    localStorage.setItem("selectedLessonData", JSON.stringify(lessonData));
  }

  saveFCMToken(fcmToken: string) {
    localStorage.setItem("fcmToken", fcmToken);
  }

  getFCMToken(fcmToken: string): string {
    return localStorage.getItem("fcmToken");
  }

  getSelectedCourseData(): any {
    return JSON.parse(localStorage.getItem("selectedCourseData"));
  }
  getSelectedLessonData(): any {
    return JSON.parse(localStorage.getItem("selectedLessonData"));
  }

  saveQuizResultData(quizResultData: any) {
    localStorage.setItem("quizResultData", JSON.stringify(quizResultData));
  }

  getQuizResultData(): any {
    return JSON.parse(localStorage.getItem("quizResultData"));
  }
}
