import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { skip } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuardGuard implements CanActivate {

  private templateCreaterID: String;
  private acadmyID: string;

  constructor(private auth: AuthserviceService, private myRoute: Router,
    private activeRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route);
    if (this.auth.isStudentLoggedIn() && this.auth.getStudentAcadmy(route.queryParams.academy) === route.queryParams.academy) {
      return true;
    } else {
      debugger
      this.myRoute.navigate(['/cb-template-buy-now'], { queryParams: { id: route.queryParams.id, academy: route.queryParams.academy } })
      return false;
    }
  }
}
