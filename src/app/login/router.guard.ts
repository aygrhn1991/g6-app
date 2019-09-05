import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    let isLogin = localStorage.getItem('isLogin');
    console.log(isLogin);
    if (isLogin == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
