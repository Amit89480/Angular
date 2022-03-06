import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user: any = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.type != 'user') {
        return this.router.createUrlTree(['auth/login']);
      } else {
        return true;
      }
    } else {
      return this.router.createUrlTree(['auth/login']);
    }
  }
  
}
