import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BindGuard implements CanActivate {
  constructor(private router: Router,
    private user: UserService,
    private util: UtilService,
    private toast: ToastService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.util.isNull(this.user.user.vin)) {
      this.toast.show('请绑定车辆');
      this.router.navigate(['/tabs/user']);
      return false;
    }
    return true;
  }

}
