import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private cookieService: CookieService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
