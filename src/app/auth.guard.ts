import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthserviceService, private myRoute: Router){}

  canActivate() {
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(["home"])
      return false;
    }
  }
}
