import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthserviceService } from 'src/app/authservice.service'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  //  apiUrl: string = 'http://localhost:3000'
  // apiUrl: string = 'https://gfunlbackend.herokuapp.com'
  apiUrl: string = 'http://54.144.5.93:3000'

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': this.auth.getToken()
  });

  constructor(public httpclient: HttpClient, private auth: AuthserviceService) { }

  public getProfile(token: string): Observable<any> {
    console.log("token is", this.auth.getToken())
    console.log("header is", this.headers)

    return this.httpclient.post(this.apiUrl + '/users/getprofile', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public courseCategoryList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/courseCategoryList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public academyListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/academyListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public courseList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/courseListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public listOfRatingAndCommentAcademyWise(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/listOfRatingAndComment_academyWise', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': token
      })
    })
  }

  public announcementListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/announcementListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public listOfStudent(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/listOfStudentEnrolled_inAcademy_CourseDetails_packageDetails', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public previewAcademyInformation(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewAcademyInformation', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateAcademyInformation(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateAcademyInformation', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public createCoures(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/createCoures', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateCourseDetails(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateCourseDetails', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public deleteCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deleteCourse', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public createCourseModule(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/createCourseModule', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public courseModuleListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/courseModuleListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateCourseModule(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateCourseModule', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteModuleOfCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deleteModuleOfCourse', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createCourseLesson(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/module_LessonInfo', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public courseLessonListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/moduleLessonListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateCourseLesson(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateLessonInfo', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteLessonOfModule(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deleteLessonofModule', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createLessonQuizDetails(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/LessonQuizDetails', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateLessonQuizDetails(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateLessonQuiz', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public addQuizQuestions(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/addQuizQuestions', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createLessonAssignment(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/LessonAssignment', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public addAnnouncement(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/addAnnouncement', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public previewLessonAssignment(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewLessonAssignment', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateLessonAssignmnet(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateLessonAssignmnet', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteLessonAssignment(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/DeleteLessonAssignment', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createLessonVideo(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/LessonVideoDetails', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateLessonVideo(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateLessonVideo', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public deleteLessonVideo(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/DeleteLessonVideo', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public previewLessonVideo(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewLessonVideo', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteQuizOfLesson(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deleteQuizOfLesson', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public previewLessonQuiz(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewLessonQuiz', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteQuizQuestion(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deleteQuizQuestion', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public courseAccessDetails(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/courseAccessDetails', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public modulesAndLessonListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/modulesAndLessonListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public fetchAccessDetailsofCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/fetchAccessDetailsofCourse', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public coursePricingPage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/coursePricingPage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public accessLessonofPackage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/accessLessonofPackage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateTheAccessLessonOfPackage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/updateTheAccessLessonOfPackage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deletePackage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/deletePackage', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public previewAccessLessonofPackage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewAccessLessonofPackage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createAcademy(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/createAcademy', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public addIntialInformation(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/addIntialInformation', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public previewIntialInformation(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/previewIntialInformation', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public removeTheSubject(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/removeTheSubject', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }



  public signIn(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/logIn', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public getStudentProfile(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/previewStudent', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public signup(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/register', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  public otpConfirmation(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/otpConfirmation', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  public resentOTP(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/generateOtpforResetPassword', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  public fetchPackagesofCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/fetchPackagesofCourse', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public fetchCoursesList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/fetchCourseList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public fetchUserEnrolledCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/fetchUserEnrolledCourse', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public buyACourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/enrolledCoursesAddToCart', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public fetchUserEnrolledModules(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/fetchAllModuleAndLessonInformationOfCourse_AccordingToPackageOfUser', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public isQuizAndAssignmentOpen(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/checkIfStudentAttemptedQuizAndAssignment', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public submitAssignment(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/submitAssignmentInformation', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public submitQuizResult(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/calculateStudentQuizResult', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public rateTheCourse(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/rateTheCourse', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public updateProfile(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/updateStudentProfile', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public sendFCMToken(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/storeStudentToken', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public fetchStudentAnnouncements(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/announcementListingAccordingToStudentOfSpecificAcademy', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public submitVideoEndedInfo(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/studentCourse/submitVideoInformation', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public fetchCourseEngagement(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/courseBuilder/gatherTheCourseEngagementGraphData', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  // Affiliate Program Api calls

  public listingAccordingToModule(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/affilate/listingAccordingToModule', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createAffilation(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/affilate/createAffilation', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

}
