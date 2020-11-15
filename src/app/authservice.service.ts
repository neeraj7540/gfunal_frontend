import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem("gfunallogin", token)
  }

  getToken() {
    return localStorage.getItem("gfunallogin")
  }

  sendUserName(username: string) {
    localStorage.setItem("gfunalUserName", username)
  }

  getUserName() {
    return localStorage.getItem("gfunalUserName")
  }

  sendSiteName(sitename: string) {
    localStorage.setItem("gfunalSiteName", sitename)
  }

  getSiteName() {
    return localStorage.getItem("gfunalSiteName")
  }

  sendLandingPageCategory(landingPageCategory: string) {
    localStorage.setItem("gfunallandingPageCategory", landingPageCategory)
  }

  getLandingPageCategory() {
    return localStorage.getItem("gfunallandingPageCategory")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isBought() {
    return this.getPackageCheck() !== null;
  }

  getPackageCheck() {
    console.log("Bought Item is:", localStorage.getItem("bought"))
    return localStorage.getItem("bought")
  }

  logout() {
    localStorage.removeItem("gfunallogin");
    localStorage.removeItem("bought");
    this.myRoute.navigate(['Home']);
  }

  checkPackage(package1) {
    console.log("package tken is", package1)
    if (!package1) {
      return
    }
    return localStorage.setItem('bought', package1)
  }

  sendCourseId(courseId: string) {
    localStorage.setItem("gfunalCourseId", courseId)
  }

  getCourseId() {
    return localStorage.getItem("gfunalCourseId")
  }

  sendModuleId(moduleId: string) {
    localStorage.setItem("gfunalModuleId", moduleId)
  }

  getModuleId() {
    return localStorage.getItem("gfunalModuleId")
  }

  sendModuleName(moduleName: string) {
    localStorage.setItem("gfunalModuleName", moduleName)
  }

  getModuleName() {
    return localStorage.getItem("gfunalModuleName")
  }

  sendLessonId(lessonId: string) {
    localStorage.setItem("gfunalLessonId", lessonId)
  }

  getLessonId() {
    return localStorage.getItem("gfunalLessonId")
  }

  sendLessonName(lessonName: string) {
    localStorage.setItem("gfunalLessonName", lessonName)
  }

  getLessonName() {
    return localStorage.getItem("gfunalLessonName")
  }

  sendQuizId(quizId: string) {
    localStorage.setItem("gfunalQuizId", quizId)
  }

  getQuizId() {
    return localStorage.getItem("gfunalQuizId")
  }

  sendAssignmentId(assignmentId: string) {
    localStorage.setItem("gfunalAssignmentId", assignmentId)
  }

  getAssignmentId() {
    return localStorage.getItem("gfunalAssignmentId")
  }

  sendVideoId(videoId: string) {
    localStorage.setItem("gfunalVideoId", videoId)
  }

  getVideoId() {
    return localStorage.getItem("gfunalVideoId")
  }

  sendIntialInformationID(intialInformationID: string) {
    localStorage.setItem("gfunalIntialInformationID", intialInformationID)
  }

  getIntialInformationID() {
    return localStorage.getItem("gfunalIntialInformationID")
  }

  sendCourcePackageID(courcePackageID: string) {
    localStorage.setItem("gfunalCourcePackageID", courcePackageID)
  }

  getCourcePackageID() {
    return localStorage.getItem("gfunalCourcePackageID")
  }

  sendAcademyId(academyId: string) {
    localStorage.setItem("gfunalacademyId", academyId)
  }

  getAcademyId() {
    return localStorage.getItem("gfunalacademyId");
  }

  sendAcademyUrl(academyId: string) {
    localStorage.setItem("gfunalacademyUrl", academyId)
  }

  getAcademyUrl() {
    return localStorage.getItem("gfunalacademyUrl");
  }

  sendShopUrl(shopUrl: string) {
    localStorage.setItem("gfunalshopUrl", shopUrl)
  }

  getShopUrl() {
    return localStorage.getItem("gfunalshopUrl");
  }

  studentLoggedIn(isLoggedIn: string) {
    localStorage.setItem("isStudentLoggedIn", isLoggedIn);
  }


  saveStudentAcadmy(academyId: string) {
    localStorage.setItem("acadmy-" + academyId, academyId);
  }

  getStudentAcadmy(key: string) {
    return localStorage.getItem("acadmy-" + key);
  }

  currentStudentAcadmy(academyId: string) {
    localStorage.setItem("currentStudentAcadmy", academyId);
  }

  getCurrentStudentAcadmy() {
    return localStorage.getItem("currentStudentAcadmy");
  }

  isStudentLoggedIn() {
    return localStorage.getItem("isStudentLoggedIn") === null ? false : true
  }


  saveStudentToken(token: string) {
    localStorage.setItem("studentToken", token)
  }
  getStudentToken() {
    return localStorage.getItem("studentToken")
  }

  studentLogout(templateID: string, acadmyId: string) {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("isStudentLoggedIn");
    this.myRoute.navigate(['/cb-template-buy-now'], { queryParams: { id: templateID, academy: acadmyId } })
  }

  saveStudentProfile(profile: any) {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }
  getStudentProfile() {
    return JSON.parse(localStorage.getItem("studentProfile"));
  }

  isEcommerceUserLoggedIn() {
    return localStorage.getItem("isEcommerceUserLoggedIn") === null ? false : true
  }

  saveEcommercerUserToken(token: string) {
    localStorage.setItem("ecommercerUserToken", token)
  }
  getEcommercerUserToken() {
    return localStorage.getItem("ecommercerUserToken")
  }
  ecommerceUserLoggedIn(isLoggedIn: string) {
    localStorage.setItem("isEcommerceUserLoggedIn", isLoggedIn);
  }

  ecommerceLogout(id:string, createrId:string) {
    // localStorage.removeItem("ecommercerUserToken");
    // localStorage.removeItem("isEcommerceUserLoggedIn");
    this.myRoute.navigate(["/ecom-login"], { queryParams: { id: id, createdById: createrId } })
  }
}
